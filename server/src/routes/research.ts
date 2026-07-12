import { Router } from "express";
import type { Request, Response } from "express";
import { compileWorkflow } from "../agent/engine.js";
import prisma from "../db.js";

const router = Router();

/**
 * POST /api/research
 *
 * Initiates an investment research pipeline and streams results
 * back to the client via Server-Sent Events (SSE).
 *
 * SSE protocol:
 *  - Each event is a JSON object: { node, status, message, data? }
 *  - Client opens this as an EventSource or reads the stream manually
 *  - Connection stays open until the pipeline completes or errors
 *
 * Why SSE over WebSocket:
 *  - SSE is simpler for unidirectional server→client streaming
 *  - Built-in browser reconnection support
 *  - Works through most proxies without special config
 *  - We don't need bidirectional communication here
 */
router.post("/", async (req: Request, res: Response) => {
  const { companyName, ticker, region } = req.body;

  // Input validation
  if (!companyName || typeof companyName !== "string" || companyName.trim().length === 0) {
    res.status(400).json({ error: "companyName is required" });
    return;
  }

  if (!region || !["IN", "US", "GLOBAL"].includes(region)) {
    res.status(400).json({ error: "region must be one of: IN, US, GLOBAL" });
    return;
  }

  // Set up SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no"); // Disable nginx buffering if proxied

  const sendEvent = (eventData: Record<string, unknown>) => {
    res.write(`data: ${JSON.stringify(eventData)}\n\n`);
  };

  const startTime = Date.now();
  let sessionId: string | null = null;

  try {
    // Create a research session in the database
    const session = await prisma.researchSession.create({
      data: {
        companyName: companyName.trim(),
        ticker: (ticker || "").trim(),
        region,
      },
    });
    sessionId = session.id;

    sendEvent({
      node: "system",
      status: "initialized",
      message: `Research session ${session.id} created. Starting 7-node analysis pipeline...`,
      sessionId: session.id,
    });

    // Compile and stream the LangGraph workflow
    const workflow = compileWorkflow();
    const stream = await workflow.stream({
      companyName: companyName.trim(),
      ticker: (ticker || "").trim(),
      region: region as "IN" | "US" | "GLOBAL",
      currentNode: "START",
      executionLogs: [],
    });

    let finalState: Record<string, any> = {};

    for await (const chunk of stream) {
      // Each chunk is { nodeName: nodeOutput }
      const nodeKey = Object.keys(chunk)[0];
      if (!nodeKey) continue;

      const nodeOutput = (chunk as Record<string, any>)[nodeKey];
      finalState = { ...finalState, ...nodeOutput };

      // Stream execution logs to client
      if (nodeOutput.executionLogs) {
        for (const log of nodeOutput.executionLogs) {
          sendEvent(log);

          // Also persist node logs to database
          await prisma.nodeLog.create({
            data: {
              sessionId: session.id,
              nodeName: log.node,
              status: log.status,
              payload: log.data || {},
              durationMs: log.durationMs || null,
            },
          }).catch(err => console.error("[DB] Failed to save node log:", err.message));
        }
      }
    }

    // Update the session with final results
    const executionTimeMs = Date.now() - startTime;

    await prisma.researchSession.update({
      where: { id: session.id },
      data: {
        decision: finalState.finalDecision || null,
        compositeScore: finalState.compositeScore || null,
        riskLevel: finalState.riskLevel || null,
        reasoningSummary: finalState.reasoningSummary || null,
        quantMetrics: finalState.quantitativeMetrics || {},
        qualMetrics: finalState.qualitativeMetrics || {},
        competitorData: finalState.competitors || [],
        executionTimeMs,
      },
    });

    // Send final summary event
    sendEvent({
      node: "system",
      status: "complete",
      message: `Analysis complete in ${(executionTimeMs / 1000).toFixed(1)}s`,
      sessionId: session.id,
      result: {
        decision: finalState.finalDecision,
        compositeScore: finalState.compositeScore,
        riskLevel: finalState.riskLevel,
        confidenceLevel: finalState.confidenceLevel,
        reasoningSummary: finalState.reasoningSummary,
        quantitativeMetrics: finalState.quantitativeMetrics,
        qualitativeMetrics: finalState.qualitativeMetrics,
        competitors: finalState.competitors,
        competitivePosition: finalState.competitivePosition,
        quantAnalysisSummary: finalState.quantAnalysisSummary,
        ticker: finalState.resolvedTicker,
        exchange: finalState.exchange,
        currency: finalState.currency,
        sector: finalState.sector,
        industry: finalState.industry,
      },
    });
  } catch (err) {
    console.error("[Research] Pipeline error:", err);

    sendEvent({
      node: "system",
      status: "error",
      message: `Analysis pipeline failed: ${(err as Error).message}`,
    });

    // Update session with failure status
    if (sessionId) {
      await prisma.researchSession.update({
        where: { id: sessionId },
        data: {
          decision: "ERROR",
          reasoningSummary: `Pipeline failed: ${(err as Error).message}`,
          executionTimeMs: Date.now() - startTime,
        },
      }).catch(e => console.error("[DB] Failed to update failed session:", e.message));
    }
  } finally {
    res.end();
  }
});

export default router;
