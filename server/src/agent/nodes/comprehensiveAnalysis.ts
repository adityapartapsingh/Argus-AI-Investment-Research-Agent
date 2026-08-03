import { HumanMessage } from "@langchain/core/messages";
import type { AgentStateType, ExecutionLog, CompetitorData, QualitativeMetrics } from "../state.js";
import { invokeWithFallback } from "../../llm/provider.js";

/**
 * Node 3: Comprehensive Analysis (Single-Shot LLM)
 *
 * This node takes the raw financial data and executes ONE MASSIVE prompt
 * to the LLM to get sentiment, risk score, competitor benchmarks, and the
 * final investment decision all at once. This avoids rate limits and saves time.
 */
export async function comprehensiveAnalysis(
  state: AgentStateType
): Promise<Partial<AgentStateType>> {
  const startTime = Date.now();

  const logs: ExecutionLog[] = [
    {
      node: "comprehensiveAnalysis",
      status: "running",
      message: `Analyzing all data for ${state.resolvedTicker} (1-Shot AI Analysis)...`,
      timestamp: new Date().toISOString(),
    },
  ];

  try {
    // Omit priceHistory from LLM input to save thousands of tokens and drastically speed up inference
    const llmData = { ...state.quantitativeMetrics };
    delete (llmData as any).priceHistory;

    const prompt = `You are an elite institutional investment analyst. Analyze the following company data and return a comprehensive research report in STRICT JSON format.

Company: ${state.companyName} (${state.resolvedTicker})
Sector: ${state.sector}
Industry: ${state.industry}
Description: ${state.companyDescription}
Financial Data: ${JSON.stringify(llmData, null, 2)}

Respond with exactly this JSON structure (and nothing else):
{
  "qualitativeMetrics": {
    "sentiment": "BULLISH" | "BEARISH" | "NEUTRAL",
    "sentimentScore": <number 0-100>,
    "sentimentConfidence": <number 0-100>,
    "themes": ["<max 2 themes>"],
    "riskFactors": ["<max 2 risks>"],
    "catalysts": ["<max 2 catalysts>"],
    "newsHeadlines": [] // Leave empty
  },
  "quantAnalysisSummary": "<1 short sentence explaining financial health>",
  "competitors": [
    { "name": "...", "ticker": "...", "peRatio": <num>, "marketCap": <num>, "revenueGrowth": <num>, "margin": <num> }
    // max 2 competitors
  ],
  "competitivePosition": "<1 short sentence comparing to competitors>",
  "compositeScore": <number 0-100>,
  "riskLevel": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
  "finalDecision": "INVEST" | "PASS",
  "reasoningSummary": "<1 concise paragraph final investment thesis>",
  "confidenceLevel": <number 0-100>
}
`;

    const { content } = await invokeWithFallback(
      [new HumanMessage(prompt)],
      "comprehensiveAnalysis"
    );

    // Parse the JSON response
    const rawContent = content.replace(/```json|```/g, "").trim();
    const result = JSON.parse(rawContent);

    const durationMs = Date.now() - startTime;
    
    logs.push({
      node: "comprehensiveAnalysis",
      status: "completed",
      message: `Completed comprehensive analysis. Decision: ${result.finalDecision}`,
      timestamp: new Date().toISOString(),
      durationMs,
    });

    return {
      qualitativeMetrics: result.qualitativeMetrics as QualitativeMetrics,
      quantAnalysisSummary: result.quantAnalysisSummary,
      competitors: result.competitors as CompetitorData[],
      competitivePosition: result.competitivePosition,
      compositeScore: result.compositeScore,
      riskLevel: result.riskLevel,
      finalDecision: result.finalDecision,
      reasoningSummary: result.reasoningSummary,
      confidenceLevel: result.confidenceLevel,
      currentNode: "comprehensiveAnalysis",
      executionLogs: logs,
    };
  } catch (err) {
    logs.push({
      node: "comprehensiveAnalysis",
      status: "failed",
      message: `Analysis failed: ${(err as Error).message}`,
      timestamp: new Date().toISOString(),
      durationMs: Date.now() - startTime,
    });

    return {
      currentNode: "comprehensiveAnalysis",
      executionLogs: logs,
    };
  }
}
