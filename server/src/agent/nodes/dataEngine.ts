import type { AgentStateType, ExecutionLog, QuantitativeMetrics } from "../state.js";
import * as yahoo from "../tools/yahooFinance.js";
import { invokeWithFallback } from "../../llm/provider.js";

/**
 * Node 2: Data Engine
 *
 * Fetches raw financial data from Yahoo Finance (primary) and
 * Alpha Vantage (backup/enrichment). Merges results into a
 * normalized QuantitativeMetrics object.
 *
 * Error handling strategy:
 *  - Try Yahoo Finance (no API key needed, richer data)
 *  - If Yahoo fails or returns partial data, return whatever we got with warning flags
 *  - Never throw — downstream nodes must handle missing data gracefully
 */
export async function dataEngine(
  state: AgentStateType
): Promise<Partial<AgentStateType>> {
  const startTime = Date.now();
  const ticker = state.resolvedTicker;

  const logs: ExecutionLog[] = [
    {
      node: "dataEngine",
      status: "running",
      message: `Fetching financial data for ${ticker} from Yahoo Finance...`,
      timestamp: new Date().toISOString(),
    },
  ];

  // Run Yahoo Finance fetches in parallel
  const [yahooQuote, yahooFinancials, yahooPrices] = await Promise.all([
    yahoo.getQuote(ticker),
    yahoo.getFinancials(ticker),
    yahoo.getHistoricalPrices(ticker, "1y"),
  ]);

  const dataSources: string[] = [];
  if (yahooQuote) dataSources.push("Yahoo Finance (quote)");
  if (yahooFinancials) dataSources.push("Yahoo Finance (financials)");

  // Map Yahoo data
  const metrics: QuantitativeMetrics = {
    peRatio: yahooQuote?.peRatio ?? null,
    pbRatio: yahooQuote?.pbRatio ?? null,
    debtToEquity: yahooFinancials?.debtToEquity ?? null,
    returnOnEquity: yahooFinancials?.returnOnEquity ?? null,
    revenueGrowthYoY: yahooFinancials?.revenueGrowthYoY ?? null,
    freeCashFlow: yahooFinancials?.freeCashFlow ?? null,
    operatingMargin: yahooFinancials?.operatingMargin ?? null,
    epsTrailingTwelveMonths: yahooFinancials?.epsTrailingTwelveMonths ?? null,
    totalRevenue: yahooFinancials?.totalRevenue ?? null,
    totalDebt: yahooFinancials?.totalDebt ?? null,
    totalCash: yahooFinancials?.totalCash ?? null,
    marketCap: yahooQuote?.marketCap ?? null,
    dividendYield: yahooQuote?.dividendYield ?? null,
    revenueHistory: yahooFinancials?.revenueHistory ?? [],
    priceHistory: yahooPrices,
  };

  let sector = yahooQuote?.sector ?? "";
  let industry = yahooQuote?.industry ?? "";
  let companyDescription = yahooQuote?.longBusinessSummary ?? "";

  if (!yahooQuote && !yahooFinancials) {
    logs.push({
      node: "dataEngine",
      status: "running",
      message: `Yahoo Finance failed. Triggering LLM data fallback...`,
      timestamp: new Date().toISOString(),
    });

    try {
      const prompt = `You are a financial data API fallback. The live data fetch for ${ticker} failed.
Provide a JSON object with your best historical estimates (as of your last training data) for this company.
If you don't know a number exactly, provide a reasonable estimate for the industry.
Return ONLY valid JSON matching this exact structure:
{
  "peRatio": 15.5,
  "pbRatio": 2.1,
  "debtToEquity": 1.2,
  "returnOnEquity": 0.15,
  "revenueGrowthYoY": 0.05,
  "freeCashFlow": 1000000000,
  "operatingMargin": 0.12,
  "epsTrailingTwelveMonths": 3.4,
  "totalRevenue": 20000000000,
  "totalDebt": 5000000000,
  "totalCash": 2000000000,
  "marketCap": 50000000000,
  "dividendYield": 0.02,
  "sector": "Technology",
  "industry": "Software",
  "longBusinessSummary": "Brief description of the company..."
}
No markdown formatting, just raw JSON.`;

      const response = await invokeWithFallback([{ role: "user", content: prompt }], "dataEngineFallback");
      const cleanJson = response.content.replace(/\`\`\`json/g, "").replace(/\`\`\`/g, "").trim();
      const llmData = JSON.parse(cleanJson);

      metrics.peRatio = llmData.peRatio ?? null;
      metrics.pbRatio = llmData.pbRatio ?? null;
      metrics.debtToEquity = llmData.debtToEquity ?? null;
      metrics.returnOnEquity = llmData.returnOnEquity ?? null;
      metrics.revenueGrowthYoY = llmData.revenueGrowthYoY ?? null;
      metrics.freeCashFlow = llmData.freeCashFlow ?? null;
      metrics.operatingMargin = llmData.operatingMargin ?? null;
      metrics.epsTrailingTwelveMonths = llmData.epsTrailingTwelveMonths ?? null;
      metrics.totalRevenue = llmData.totalRevenue ?? null;
      metrics.totalDebt = llmData.totalDebt ?? null;
      metrics.totalCash = llmData.totalCash ?? null;
      metrics.marketCap = llmData.marketCap ?? null;
      metrics.dividendYield = llmData.dividendYield ?? null;

      sector = llmData.sector ?? "";
      industry = llmData.industry ?? "";
      companyDescription = llmData.longBusinessSummary ?? "";

      dataSources.push("Gemini (Fallback Data)");
    } catch (e) {
      logs.push({
        node: "dataEngine",
        status: "running",
        message: `LLM fallback also failed: ${(e as Error).message}`,
        timestamp: new Date().toISOString(),
      });
    }
  }

  const durationMs = Date.now() - startTime;

  logs.push({
    node: "dataEngine",
    status: "completed",
    message: `Fetched ${dataSources.length} data sources in ${durationMs}ms. ` +
      `Revenue history: ${metrics.revenueHistory.length} years. ` +
      `Price history: ${metrics.priceHistory.length} data points.`,
    timestamp: new Date().toISOString(),
    durationMs,
    data: {
      sources: dataSources,
      metricsAvailable: Object.entries(metrics)
        .filter(([_, v]) => v !== null && (!Array.isArray(v) || v.length > 0))
        .map(([k]) => k),
    },
  });

  return {
    quantitativeMetrics: metrics,
    sector,
    industry,
    companyDescription,
    currentNode: "dataEngine",
    executionLogs: logs,
  };
}
