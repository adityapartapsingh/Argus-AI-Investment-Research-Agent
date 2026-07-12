import yahooFinance from "yahoo-finance2";

/**
 * Yahoo Finance data wrapper.
 * Uses the `yahoo-finance2` npm package — no API key required.
 *
 * Rate limits: Yahoo doesn't publish official limits but will throttle
 * at ~2000 req/hour. For our use case (1 company at a time), this is fine.
 *
 * Error handling strategy:
 *  - Each method returns `null` on failure instead of throwing
 *  - Caller (dataEngine node) decides how to handle partial data
 */

export interface YahooQuoteData {
  price: number | null;
  marketCap: number | null;
  peRatio: number | null;
  pbRatio: number | null;
  dividendYield: number | null;
  fiftyTwoWeekHigh: number | null;
  fiftyTwoWeekLow: number | null;
  avgVolume: number | null;
  currency: string;
  exchange: string;
  sector: string | null;
  industry: string | null;
  longBusinessSummary: string | null;
}

export interface YahooFinancialData {
  revenueHistory: { year: number; revenue: number; netIncome: number }[];
  debtToEquity: number | null;
  returnOnEquity: number | null;
  freeCashFlow: number | null;
  operatingMargin: number | null;
  epsTrailingTwelveMonths: number | null;
  revenueGrowthYoY: number | null;
  totalRevenue: number | null;
  totalDebt: number | null;
  totalCash: number | null;
}

export interface YahooHistoricalPrice {
  date: string;
  close: number;
  volume: number;
}

/**
 * Fetch current quote + company profile data
 */
export async function getQuote(ticker: string): Promise<YahooQuoteData | null> {
  try {
    const result = await yahooFinance.quoteSummary(ticker, {
      modules: ["price", "summaryProfile", "defaultKeyStatistics", "financialData"],
    });

    const price = result.price;
    const profile = result.summaryProfile;
    const keyStats = result.defaultKeyStatistics;
    const finData = result.financialData;

    return {
      price: price?.regularMarketPrice ?? null,
      marketCap: price?.marketCap ?? null,
      peRatio: keyStats?.trailingPE ?? null,
      pbRatio: keyStats?.priceToBook ?? null,
      dividendYield: keyStats?.dividendYield ?? null,
      fiftyTwoWeekHigh: keyStats?.fiftyTwoWeekHigh ?? null,
      fiftyTwoWeekLow: keyStats?.fiftyTwoWeekLow ?? null,
      avgVolume: price?.averageDailyVolume3Month ?? null,
      currency: price?.currency ?? "USD",
      exchange: price?.exchangeName ?? "Unknown",
      sector: profile?.sector ?? null,
      industry: profile?.industry ?? null,
      longBusinessSummary: profile?.longBusinessSummary ?? null,
    };
  } catch (err) {
    console.error(`[YahooFinance] getQuote failed for ${ticker}:`, (err as Error).message);
    return null;
  }
}

/**
 * Fetch financial statements: income statement, balance sheet, cash flow
 */
export async function getFinancials(ticker: string): Promise<YahooFinancialData | null> {
  try {
    const result = await yahooFinance.quoteSummary(ticker, {
      modules: ["incomeStatementHistory", "balanceSheetHistory", "cashflowStatementHistory", "financialData", "defaultKeyStatistics"],
    });

    const incomeStatements = result.incomeStatementHistory?.incomeStatementHistory ?? [];
    const finData = result.financialData;
    const keyStats = result.defaultKeyStatistics;

    // Build revenue history from income statements (most recent 4 years)
    const revenueHistory = incomeStatements
      .map((stmt: any) => ({
        year: new Date(stmt.endDate).getFullYear(),
        revenue: stmt.totalRevenue ?? 0,
        netIncome: stmt.netIncome ?? 0,
      }))
      .reverse(); // Oldest first for chart rendering

    // Calculate YoY revenue growth from the two most recent years
    let revenueGrowthYoY: number | null = null;
    if (revenueHistory.length >= 2) {
      const latest = revenueHistory[revenueHistory.length - 1]!;
      const previous = revenueHistory[revenueHistory.length - 2]!;
      if (previous.revenue > 0) {
        revenueGrowthYoY = ((latest.revenue - previous.revenue) / previous.revenue) * 100;
      }
    }

    return {
      revenueHistory,
      debtToEquity: finData?.debtToEquity ?? null,
      returnOnEquity: finData?.returnOnEquity ?? null,
      freeCashFlow: finData?.freeCashFlow ?? null,
      operatingMargin: finData?.operatingMargins ?? null,
      epsTrailingTwelveMonths: keyStats?.trailingEps ?? null,
      revenueGrowthYoY,
      totalRevenue: finData?.totalRevenue ?? null,
      totalDebt: finData?.totalDebt ?? null,
      totalCash: finData?.totalCash ?? null,
    };
  } catch (err) {
    console.error(`[YahooFinance] getFinancials failed for ${ticker}:`, (err as Error).message);
    return null;
  }
}

/**
 * Fetch 1-year historical daily closing prices for trend analysis
 */
export async function getHistoricalPrices(
  ticker: string,
  period: "3mo" | "6mo" | "1y" = "1y"
): Promise<YahooHistoricalPrice[]> {
  try {
    const endDate = new Date();
    const startDate = new Date();
    if (period === "3mo") startDate.setMonth(startDate.getMonth() - 3);
    else if (period === "6mo") startDate.setMonth(startDate.getMonth() - 6);
    else startDate.setFullYear(startDate.getFullYear() - 1);

    const result = await yahooFinance.chart(ticker, {
      period1: startDate,
      period2: endDate,
      interval: "1wk",
    });

    return (result.quotes ?? []).map((q: any) => ({
      date: new Date(q.date).toISOString().split("T")[0]!,
      close: q.close ?? 0,
      volume: q.volume ?? 0,
    }));
  } catch (err) {
    console.error(`[YahooFinance] getHistoricalPrices failed for ${ticker}:`, (err as Error).message);
    return [];
  }
}
