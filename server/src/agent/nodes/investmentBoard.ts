import type { AgentStateType, ExecutionLog } from "../state.js";
import { invokeWithFallback } from "../../llm/provider.js";
import { HumanMessage } from "@langchain/core/messages";

/**
 * Node 7: Investment Board (Final Decision)
 *
 * This is the final deliberation node. It receives the entire accumulated
 * state from all previous nodes and makes the INVEST or PASS decision.
 *
 * The prompt is designed as an "investment committee" simulation:
 *  - Forces the LLM to evaluate a 5-point checklist
 *  - Each point must be explicitly marked ✓ or ✗
 *  - Majority rules: 3+ green signals = INVEST, otherwise PASS
 *  - Produces a detailed 3-5 paragraph reasoning summary
 *
 * This is where all the work from nodes 1-6 comes together.
 */
export async function investmentBoard(
  state: AgentStateType
): Promise<Partial<AgentStateType>> {
  const startTime = Date.now();

  const logs: ExecutionLog[] = [
    {
      node: "investmentBoard",
      status: "running",
      message: "Investment Board convening for final verdict deliberation...",
      timestamp: new Date().toISOString(),
    },
  ];

  try {
    const metrics = state.quantitativeMetrics;
    const qual = state.qualitativeMetrics;

    const briefingDocument = `
═══════════════════════════════════════════════════════════════
INVESTMENT COMMITTEE BRIEFING DOCUMENT
═══════════════════════════════════════════════════════════════

COMPANY: ${state.companyName} (${state.resolvedTicker})
EXCHANGE: ${state.exchange} | CURRENCY: ${state.currency}
SECTOR: ${state.sector} | INDUSTRY: ${state.industry}

───────────────────────────────────────────────────────────────
SECTION 1: QUANTITATIVE PROFILE
───────────────────────────────────────────────────────────────
Quantitative Score: ${state.quantScore}/100
P/E Ratio: ${metrics?.peRatio ?? "N/A"}
P/B Ratio: ${metrics?.pbRatio ?? "N/A"}
Debt-to-Equity: ${metrics?.debtToEquity ?? "N/A"}
ROE: ${metrics?.returnOnEquity != null ? (metrics.returnOnEquity * 100).toFixed(1) + "%" : "N/A"}
Revenue Growth (YoY): ${metrics?.revenueGrowthYoY?.toFixed(1) ?? "N/A"}%
Free Cash Flow: ${metrics?.freeCashFlow ?? "N/A"}
Operating Margin: ${metrics?.operatingMargin != null ? (metrics.operatingMargin * 100).toFixed(1) + "%" : "N/A"}
Market Cap: ${metrics?.marketCap ?? "N/A"}

Analysis Summary:
${state.quantAnalysisSummary || "No quant analysis available."}

───────────────────────────────────────────────────────────────
SECTION 2: MARKET SENTIMENT
───────────────────────────────────────────────────────────────
Overall Sentiment: ${qual?.sentiment ?? "N/A"} (Score: ${qual?.sentimentScore ?? "N/A"}/100)
Confidence: ${qual?.sentimentConfidence ?? "N/A"}

Key Themes: ${qual?.themes?.join(", ") || "None identified"}
Risk Factors: ${qual?.riskFactors?.join("; ") || "None identified"}
Positive Catalysts: ${qual?.catalysts?.join("; ") || "None identified"}

───────────────────────────────────────────────────────────────
SECTION 3: COMPETITIVE LANDSCAPE
───────────────────────────────────────────────────────────────
Peer Companies:
${state.competitors?.map(c =>
  `  • ${c.name} (${c.ticker}): PE=${c.peRatio ?? "N/A"}, MCap=${c.marketCap ?? "N/A"}, Growth=${c.revenueGrowth?.toFixed(1) ?? "N/A"}%`
).join("\n") || "No competitor data available."}

Position: ${state.competitivePosition || "Not assessed."}

───────────────────────────────────────────────────────────────
SECTION 4: RISK ASSESSMENT
───────────────────────────────────────────────────────────────
Composite Risk Score: ${state.compositeScore}/100
Risk Level: ${state.riskLevel}
Breakdown:
  Quant Component (40%): ${state.riskBreakdown?.quantWeight?.toFixed(1) ?? "N/A"}
  Sentiment Component (30%): ${state.riskBreakdown?.sentimentWeight?.toFixed(1) ?? "N/A"}
  Competitive Component (30%): ${state.riskBreakdown?.competitiveWeight?.toFixed(1) ?? "N/A"}

═══════════════════════════════════════════════════════════════
`;

    const { content } = await invokeWithFallback(
      [
        new HumanMessage(
          `You are a panel of three senior investment committee members deliberating on an investment decision. Review the following briefing document and make your final recommendation.

${briefingDocument}

DELIBERATION FRAMEWORK:
Evaluate each of these 5 criteria and mark each as PASS (✓) or FAIL (✗):

1. FINANCIAL HEALTH: Strong balance sheet, manageable debt, positive free cash flow
2. GROWTH TRAJECTORY: Revenue and earnings growing, positive forward outlook
3. COMPETITIVE MOAT: Strong market position vs peers, defensible advantages
4. SENTIMENT ALIGNMENT: Market sentiment supports the investment thesis
5. RISK TOLERANCE: Risk level is acceptable for the expected returns

DECISION RULE: 3 or more ✓ = INVEST, otherwise PASS.

Respond in the following JSON format ONLY:

{
  "decision": "INVEST" or "PASS",
  "confidenceLevel": <number 0-100>,
  "checklist": {
    "financialHealth": {"pass": true/false, "reason": "<brief reason>"},
    "growthTrajectory": {"pass": true/false, "reason": "<brief reason>"},
    "competitiveMoat": {"pass": true/false, "reason": "<brief reason>"},
    "sentimentAlignment": {"pass": true/false, "reason": "<brief reason>"},
    "riskTolerance": {"pass": true/false, "reason": "<brief reason>"}
  },
  "reasoningSummary": "<3-5 paragraph detailed reasoning covering the investment thesis, key risks, and why the committee reached this decision. Reference specific numbers and data points.>"
}

Respond with ONLY valid JSON, no markdown fences.`
        ),
      ],
      "investmentBoard"
    );

    const parsed = JSON.parse(content.replace(/```json?\n?/g, "").replace(/```/g, "").trim());

    const decision = parsed.decision === "INVEST" ? "INVEST" : "PASS";
    const confidenceLevel = Math.min(100, Math.max(0, Number(parsed.confidenceLevel) || 60));

    // Build a rich reasoning summary that includes the checklist
    const checklistSummary = parsed.checklist
      ? Object.entries(parsed.checklist)
          .map(([key, val]: [string, any]) => `${val.pass ? "✓" : "✗"} ${formatChecklistKey(key)}: ${val.reason}`)
          .join("\n")
      : "";

    const fullReasoning = `${parsed.reasoningSummary || ""}\n\n--- Investment Checklist ---\n${checklistSummary}`;

    const durationMs = Date.now() - startTime;

    logs.push({
      node: "investmentBoard",
      status: "completed",
      message: `VERDICT: ${decision} (Confidence: ${confidenceLevel}%). ` +
        `Checklist: ${parsed.checklist ? Object.values(parsed.checklist).filter((v: any) => v.pass).length : "?"}/5 criteria passed.`,
      timestamp: new Date().toISOString(),
      durationMs,
      data: {
        decision,
        confidenceLevel,
        checklist: parsed.checklist,
      },
    });

    return {
      finalDecision: decision,
      reasoningSummary: fullReasoning,
      confidenceLevel,
      currentNode: "investmentBoard",
      executionLogs: logs,
    };
  } catch (err) {
    const durationMs = Date.now() - startTime;

    logs.push({
      node: "investmentBoard",
      status: "failed",
      message: `Investment Board deliberation failed: ${(err as Error).message}`,
      timestamp: new Date().toISOString(),
      durationMs,
    });

    // Fallback to risk-score-based decision
    const fallbackDecision = (state.compositeScore ?? 50) >= 50 ? "INVEST" : "PASS";

    return {
      finalDecision: fallbackDecision,
      reasoningSummary: `Automated fallback decision based on composite risk score of ${state.compositeScore}/100. Full LLM deliberation was unavailable.`,
      confidenceLevel: 30,
      currentNode: "investmentBoard",
      executionLogs: logs,
    };
  }
}

function formatChecklistKey(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, s => s.toUpperCase())
    .trim();
}
