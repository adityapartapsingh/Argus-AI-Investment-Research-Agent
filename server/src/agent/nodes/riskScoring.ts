import type { AgentStateType, ExecutionLog } from "../state.js";

/**
 * Node 6: Risk Scoring (Gate Node)
 *
 * Aggregates all analysis into a composite risk score and determines
 * whether the pipeline should proceed to the investment board or
 * short-circuit to a PASS verdict for critically risky companies.
 *
 * Scoring weights:
 *  - Quantitative Score: 40% (financial health is the strongest signal)
 *  - Sentiment Score: 30% (market perception matters)
 *  - Competitive Position: 30% (relative strength in sector)
 *
 * Gate logic:
 *  - CRITICAL risk (composite < 25): Could short-circuit to PASS
 *  - HIGH risk (25-45): Proceed with caution flag
 *  - MEDIUM risk (45-65): Standard analysis
 *  - LOW risk (65+): Strong candidate
 *
 * This node is purely computational — no LLM calls needed.
 * This is intentional: risk scoring should be deterministic and auditable.
 */
export async function riskScoring(
  state: AgentStateType
): Promise<Partial<AgentStateType>> {
  const startTime = Date.now();

  const logs: ExecutionLog[] = [
    {
      node: "riskScoring",
      status: "running",
      message: "Aggregating risk profile from quantitative, sentiment, and competitive analysis...",
      timestamp: new Date().toISOString(),
    },
  ];

  // Get individual scores
  const quantScore = state.quantScore ?? 50;
  const sentimentScore = state.qualitativeMetrics?.sentimentScore ?? 50;

  // Derive competitive score from available data
  let competitiveScore = 50; // Default neutral
  if (state.competitors && state.competitors.length > 0) {
    const targetPE = state.quantitativeMetrics?.peRatio;
    const targetGrowth = state.quantitativeMetrics?.revenueGrowthYoY;

    if (targetPE != null && targetGrowth != null) {
      // Score higher if company has better growth at reasonable valuation
      const avgCompPE = state.competitors
        .filter(c => c.peRatio != null)
        .reduce((sum, c) => sum + c.peRatio!, 0) / (state.competitors.filter(c => c.peRatio != null).length || 1);

      const avgCompGrowth = state.competitors
        .filter(c => c.revenueGrowth != null)
        .reduce((sum, c) => sum + c.revenueGrowth!, 0) / (state.competitors.filter(c => c.revenueGrowth != null).length || 1);

      // Lower PE relative to peers is better (cheaper valuation)
      const peAdvantage = avgCompPE > 0 ? Math.min(20, Math.max(-20, (avgCompPE - targetPE) / avgCompPE * 40)) : 0;
      // Higher growth relative to peers is better
      const growthAdvantage = avgCompGrowth !== 0 ? Math.min(20, Math.max(-20, (targetGrowth - avgCompGrowth) / Math.abs(avgCompGrowth) * 30)) : 0;

      competitiveScore = Math.min(100, Math.max(0, 50 + peAdvantage + growthAdvantage));
    }
  }

  // Weighted composite score
  const QUANT_WEIGHT = 0.4;
  const SENTIMENT_WEIGHT = 0.3;
  const COMPETITIVE_WEIGHT = 0.3;

  const compositeScore = Math.round(
    quantScore * QUANT_WEIGHT +
    sentimentScore * SENTIMENT_WEIGHT +
    competitiveScore * COMPETITIVE_WEIGHT
  );

  // Determine risk level
  let riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  if (compositeScore >= 65) riskLevel = "LOW";
  else if (compositeScore >= 45) riskLevel = "MEDIUM";
  else if (compositeScore >= 25) riskLevel = "HIGH";
  else riskLevel = "CRITICAL";

  const durationMs = Date.now() - startTime;

  logs.push({
    node: "riskScoring",
    status: "completed",
    message: `Composite Score: ${compositeScore}/100 | Risk Level: ${riskLevel} | ` +
      `Breakdown → Quant: ${quantScore} (×${QUANT_WEIGHT}), Sentiment: ${sentimentScore} (×${SENTIMENT_WEIGHT}), ` +
      `Competitive: ${Math.round(competitiveScore)} (×${COMPETITIVE_WEIGHT})`,
    timestamp: new Date().toISOString(),
    durationMs,
    data: {
      compositeScore,
      riskLevel,
      quantScore,
      sentimentScore,
      competitiveScore: Math.round(competitiveScore),
    },
  });

  return {
    compositeScore,
    riskLevel,
    riskBreakdown: {
      quantWeight: quantScore * QUANT_WEIGHT,
      sentimentWeight: sentimentScore * SENTIMENT_WEIGHT,
      competitiveWeight: competitiveScore * COMPETITIVE_WEIGHT,
    },
    currentNode: "riskScoring",
    executionLogs: logs,
  };
}
