import type { AgentStateType, ExecutionLog } from "../state.js";
import { invokeWithFallback } from "../../llm/provider.js";
import { HumanMessage } from "@langchain/core/messages";

/**
 * Node 4: Quantitative Analysis
 *
 * Takes the raw financial metrics from dataEngine and performs
 * deep financial analysis via LLM. Produces a quantitative score
 * (0-100) based on multiple financial health indicators.
 *
 * This is where we combine computational data with LLM reasoning —
 * the LLM acts as a financial analyst interpreting the numbers.
 */
export async function quantAnalysis(
  state: AgentStateType
): Promise<Partial<AgentStateType>> {
  const startTime = Date.now();
  const metrics = state.quantitativeMetrics;

  const logs: ExecutionLog[] = [
    {
      node: "quantAnalysis",
      status: "running",
      message: `Running deep quantitative analysis on ${state.resolvedTicker} financial metrics...`,
      timestamp: new Date().toISOString(),
    },
  ];

  try {
    const metricsSnapshot = `
Company: ${state.companyName} (${state.resolvedTicker})
Sector: ${state.sector || "Unknown"}
Currency: ${state.currency}

KEY FINANCIAL METRICS:
- P/E Ratio: ${metrics?.peRatio ?? "N/A"}
- P/B Ratio: ${metrics?.pbRatio ?? "N/A"}
- Debt-to-Equity: ${metrics?.debtToEquity ?? "N/A"}
- Return on Equity: ${metrics?.returnOnEquity != null ? (metrics.returnOnEquity * 100).toFixed(1) + "%" : "N/A"}
- Revenue Growth YoY: ${metrics?.revenueGrowthYoY != null ? metrics.revenueGrowthYoY.toFixed(1) + "%" : "N/A"}
- Free Cash Flow: ${metrics?.freeCashFlow != null ? formatCurrency(metrics.freeCashFlow, state.currency) : "N/A"}
- Operating Margin: ${metrics?.operatingMargin != null ? (metrics.operatingMargin * 100).toFixed(1) + "%" : "N/A"}
- EPS (TTM): ${metrics?.epsTrailingTwelveMonths ?? "N/A"}
- Market Cap: ${metrics?.marketCap != null ? formatCurrency(metrics.marketCap, state.currency) : "N/A"}
- Total Revenue: ${metrics?.totalRevenue != null ? formatCurrency(metrics.totalRevenue, state.currency) : "N/A"}
- Total Debt: ${metrics?.totalDebt != null ? formatCurrency(metrics.totalDebt, state.currency) : "N/A"}
- Total Cash: ${metrics?.totalCash != null ? formatCurrency(metrics.totalCash, state.currency) : "N/A"}
- Dividend Yield: ${metrics?.dividendYield != null ? (metrics.dividendYield * 100).toFixed(2) + "%" : "N/A"}

REVENUE HISTORY:
${metrics?.revenueHistory?.map(h => `${h.year}: Revenue ${formatCurrency(h.revenue, state.currency)}, Net Income ${formatCurrency(h.netIncome, state.currency)}`).join("\n") || "No historical data available"}
`;

    const { content } = await invokeWithFallback(
      [
        new HumanMessage(
          `You are a CFA-certified quantitative financial analyst. Analyze the following company's financial metrics and provide a comprehensive quantitative assessment.

${metricsSnapshot}

Evaluate across these dimensions:
1. VALUATION: Is the stock fairly valued based on PE/PB ratios vs sector averages?
2. PROFITABILITY: How healthy are margins and ROE?
3. GROWTH: Revenue and earnings growth trajectory — accelerating or decelerating?
4. FINANCIAL HEALTH: Debt levels, cash position, free cash flow quality
5. INCOME QUALITY: Earnings quality, cash flow vs reported earnings

Respond in the following JSON format ONLY:
{
  "quantScore": <number 0-100, where 100 is strongest financial position>,
  "summary": "<2-3 paragraph detailed analysis covering all 5 dimensions above>",
  "strengths": ["<specific strength 1>", "<specific strength 2>"],
  "weaknesses": ["<specific weakness 1>", "<specific weakness 2>"],
  "valuationAssessment": "Undervalued | Fairly Valued | Overvalued"
}

Be precise and reference actual numbers from the data. Respond with ONLY valid JSON, no markdown fences.`
        ),
      ],
      "quantAnalysis"
    );

    const parsed = JSON.parse(content.replace(/```json?\n?/g, "").replace(/```/g, "").trim());
    const quantScore = Math.min(100, Math.max(0, Number(parsed.quantScore) || 50));

    const durationMs = Date.now() - startTime;

    logs.push({
      node: "quantAnalysis",
      status: "completed",
      message: `Quantitative Score: ${quantScore}/100. Valuation: ${parsed.valuationAssessment || "N/A"}. ` +
        `Identified ${parsed.strengths?.length || 0} strengths and ${parsed.weaknesses?.length || 0} weaknesses.`,
      timestamp: new Date().toISOString(),
      durationMs,
      data: {
        quantScore,
        valuation: parsed.valuationAssessment,
        strengths: parsed.strengths,
        weaknesses: parsed.weaknesses,
      },
    });

    return {
      quantScore,
      quantAnalysisSummary: parsed.summary || "",
      currentNode: "quantAnalysis",
      executionLogs: logs,
    };
  } catch (err) {
    const durationMs = Date.now() - startTime;

    logs.push({
      node: "quantAnalysis",
      status: "failed",
      message: `Quantitative analysis failed: ${(err as Error).message}. Using baseline score.`,
      timestamp: new Date().toISOString(),
      durationMs,
    });

    return {
      quantScore: 50,
      quantAnalysisSummary: "Analysis could not be completed due to an error. Baseline neutral score assigned.",
      currentNode: "quantAnalysis",
      executionLogs: logs,
    };
  }
}

function formatCurrency(value: number, currency: string): string {
  if (Math.abs(value) >= 1e12) return `${currency} ${(value / 1e12).toFixed(2)}T`;
  if (Math.abs(value) >= 1e9) return `${currency} ${(value / 1e9).toFixed(2)}B`;
  if (Math.abs(value) >= 1e6) return `${currency} ${(value / 1e6).toFixed(2)}M`;
  if (Math.abs(value) >= 1e3) return `${currency} ${(value / 1e3).toFixed(2)}K`;
  return `${currency} ${value.toFixed(2)}`;
}
