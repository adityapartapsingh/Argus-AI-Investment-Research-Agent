import type { AgentStateType, ExecutionLog, QuantitativeMetrics } from "../state.js";
import * as yahoo from "../tools/yahooFinance.js";
import * as av from "../tools/alphaVantage.js";

/**
 * Node 2: Data Engine
 *
 * Fetches raw financial data from Yahoo Finance (primary) and
 * Alpha Vantage (backup/enrichment). Merges results into a
 * normalized QuantitativeMetrics object.
 *
 * Error handling strategy:
 *  - Try Yahoo Finance first (no API key needed, richer data)
 *  - If Yahoo fails or returns partial data, enrich from Alpha Vantage
 *  - If both fail, return whatever we got with warning flags
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
      message: `Fetching financial data for ${ticker} from Yahoo Finance + Alpha Vantage...`,
      timestamp: new Date().toISOString(),
    },
  ];

  // Run Yahoo Finance and Alpha Vantage fetches in parallel
  const [yahooQuote, yahooFinancials, yahooPrices, avOverview] = await Promise.all([
    yahoo.getQuote(ticker),
    yahoo.getFinancials(ticker),
    yahoo.getHistoricalPrices(ticker, "1y"),
    av.getOverview(ticker.replace(/\.(NS|BO)$/, "")), // AV doesn't use exchange suffixes for non-US
  ]);

  const dataSources: string[] = [];
  if (yahooQuote) dataSources.push("Yahoo Finance (quote)");
  if (yahooFinancials) dataSources.push("Yahoo Finance (financials)");
  if (avOverview) dataSources.push("Alpha Vantage (overview)");

  // Merge data from both sources — Yahoo takes priority
  const metrics: QuantitativeMetrics = {
    peRatio: yahooQuote?.peRatio ?? avOverview?.peRatio ?? null,
    pbRatio: yahooQuote?.pbRatio ?? null,
    debtToEquity: yahooFinancials?.debtToEquity ?? null,
    returnOnEquity: yahooFinancials?.returnOnEquity ?? null,
    revenueGrowthYoY: yahooFinancials?.revenueGrowthYoY ?? null,
    freeCashFlow: yahooFinancials?.freeCashFlow ?? null,
    operatingMargin: yahooFinancials?.operatingMargin ?? avOverview?.profitMargin ?? null,
    epsTrailingTwelveMonths: yahooFinancials?.epsTrailingTwelveMonths ?? avOverview?.eps ?? null,
    totalRevenue: yahooFinancials?.totalRevenue ?? null,
    totalDebt: yahooFinancials?.totalDebt ?? null,
    totalCash: yahooFinancials?.totalCash ?? null,
    marketCap: yahooQuote?.marketCap ?? avOverview?.marketCap ?? null,
    dividendYield: yahooQuote?.dividendYield ?? avOverview?.dividendYield ?? null,
    revenueHistory: yahooFinancials?.revenueHistory ?? [],
    priceHistory: yahooPrices,
  };

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
    sector: yahooQuote?.sector ?? avOverview?.sector ?? "",
    industry: yahooQuote?.industry ?? avOverview?.industry ?? "",
    companyDescription: yahooQuote?.longBusinessSummary ?? avOverview?.description ?? "",
    currentNode: "dataEngine",
    executionLogs: logs,
  };
}
