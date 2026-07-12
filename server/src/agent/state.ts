import { Annotation } from "@langchain/langgraph";

/**
 * Central state definition for the Argus investment research agent.
 *
 * LangGraph uses Annotation-based state where each field can have a
 * custom reducer. Fields without reducers use "last write wins" semantics.
 *
 * The `executionLogs` field uses a custom reducer that APPENDS new log
 * entries instead of overwriting — this is critical for SSE streaming
 * because multiple nodes write logs concurrently during parallel execution.
 */

export interface ExecutionLog {
  node: string;
  status: "running" | "completed" | "failed" | "skipped";
  message: string;
  timestamp: string;
  durationMs?: number;
  data?: Record<string, unknown>;
}

export interface QuantitativeMetrics {
  peRatio: number | null;
  pbRatio: number | null;
  debtToEquity: number | null;
  returnOnEquity: number | null;
  revenueGrowthYoY: number | null;
  freeCashFlow: number | null;
  operatingMargin: number | null;
  epsTrailingTwelveMonths: number | null;
  totalRevenue: number | null;
  totalDebt: number | null;
  totalCash: number | null;
  marketCap: number | null;
  dividendYield: number | null;
  revenueHistory: { year: number; revenue: number; netIncome: number }[];
  priceHistory: { date: string; close: number; volume: number }[];
}

export interface QualitativeMetrics {
  sentiment: "BULLISH" | "BEARISH" | "NEUTRAL";
  sentimentScore: number; // 0-100
  sentimentConfidence: number;
  themes: string[];
  riskFactors: string[];
  catalysts: string[];
  newsHeadlines: { title: string; source: string; sentiment: string }[];
}

export interface CompetitorData {
  name: string;
  ticker: string;
  peRatio: number | null;
  marketCap: number | null;
  revenueGrowth: number | null;
  margin: number | null;
}

export const AgentState = Annotation.Root({
  // ── Input Fields ──
  companyName: Annotation<string>(),
  ticker: Annotation<string>(),
  region: Annotation<"IN" | "US" | "GLOBAL">(),

  // ── Resolved by intakeResolver ──
  resolvedTicker: Annotation<string>(),
  exchange: Annotation<string>(),
  currency: Annotation<string>(),
  sector: Annotation<string>(),
  industry: Annotation<string>(),
  companyDescription: Annotation<string>(),

  // ── Financial Data (dataEngine) ──
  quantitativeMetrics: Annotation<QuantitativeMetrics>(),

  // ── Sentiment Data (newsSentiment) ──
  qualitativeMetrics: Annotation<QualitativeMetrics>(),

  // ── Quant Analysis Score (quantAnalysis) ──
  quantScore: Annotation<number>(), // 0-100
  quantAnalysisSummary: Annotation<string>(),

  // ── Competitor Data (competitorBenchmark) ──
  competitors: Annotation<CompetitorData[]>(),
  competitivePosition: Annotation<string>(),

  // ── Risk Scoring (riskScoring gate) ──
  compositeScore: Annotation<number>(), // 0-100
  riskLevel: Annotation<"LOW" | "MEDIUM" | "HIGH" | "CRITICAL">(),
  riskBreakdown: Annotation<{
    quantWeight: number;
    sentimentWeight: number;
    competitiveWeight: number;
  }>(),

  // ── Final Decision (investmentBoard) ──
  finalDecision: Annotation<"INVEST" | "PASS">(),
  reasoningSummary: Annotation<string>(),
  confidenceLevel: Annotation<number>(), // 0-100

  // ── Execution Tracking ──
  currentNode: Annotation<string>(),
  executionLogs: Annotation<ExecutionLog[], ExecutionLog[]>({
    // Custom reducer: APPEND new logs to existing array
    // This is critical — parallel nodes both write logs, we can't overwrite
    reducer: (existing, incoming) => [...(existing ?? []), ...(incoming ?? [])],
    default: () => [],
  }),
});

// Export the State type for use in node functions
export type AgentStateType = typeof AgentState.State;