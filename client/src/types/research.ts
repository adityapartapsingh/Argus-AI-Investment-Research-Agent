/**
 * Shared TypeScript interfaces for the Argus frontend.
 * These mirror the server-side state definitions.
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
  sentimentScore: number;
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

export interface ResearchResult {
  decision: "INVEST" | "PASS";
  compositeScore: number;
  riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  confidenceLevel: number;
  reasoningSummary: string;
  quantitativeMetrics: QuantitativeMetrics;
  qualitativeMetrics: QualitativeMetrics;
  competitors: CompetitorData[];
  competitivePosition: string;
  quantAnalysisSummary: string;
  ticker: string;
  exchange: string;
  currency: string;
  sector: string;
  industry: string;
  companyDescription?: string;
}

export interface HistorySession {
  id: string;
  companyName: string;
  decision: string | null;
  compositeScore: number | null;
  riskLevel: string | null;
  executionTimeMs: number | null;
  createdAt: string;
}

export interface HistoryResponse {
  sessions: HistorySession[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export type NodeName =
  | "system"
  | "intakeResolver"
  | "dataEngine"
  | "comprehensiveAnalysis";

export const NODE_LABELS: Record<NodeName, string> = {
  system: "System",
  intakeResolver: "Ticker Resolution",
  dataEngine: "Data Engine",
  comprehensiveAnalysis: "AI Comprehensive Analysis",
};

export const NODE_ORDER: NodeName[] = [
  "intakeResolver",
  "dataEngine",
  "comprehensiveAnalysis",
];
