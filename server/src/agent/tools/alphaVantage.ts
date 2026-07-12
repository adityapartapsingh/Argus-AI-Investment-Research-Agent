/**
 * Alpha Vantage REST API wrapper.
 * Free tier: 25 requests/day — we use this as enrichment/backup to Yahoo Finance.
 *
 * Endpoints used:
 *  - OVERVIEW: Company fundamentals (PE, EPS, market cap, sector)
 *  - INCOME_STATEMENT: Annual income statements
 *  - NEWS_SENTIMENT: Recent news with sentiment scores
 *
 * Rate limit handling:
 *  - Returns null on failures (same pattern as Yahoo wrapper)
 *  - Alpha Vantage returns { "Note": "..." } when rate limited
 */

const BASE_URL = "https://www.alphavantage.co/query";

function getApiKey(): string {
  const key = process.env.ALPHA_VANTAGE_API_KEY;
  if (!key) throw new Error("ALPHA_VANTAGE_API_KEY not set in environment");
  return key;
}

async function fetchAV(params: Record<string, string>): Promise<any | null> {
  const url = new URL(BASE_URL);
  url.searchParams.set("apikey", getApiKey());
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  try {
    const res = await fetch(url.toString());
    if (!res.ok) {
      console.error(`[AlphaVantage] HTTP ${res.status}: ${res.statusText}`);
      return null;
    }
    const data = await res.json();

    // Alpha Vantage returns a "Note" field when rate limited
    if (data["Note"] || data["Information"]) {
      console.warn(`[AlphaVantage] Rate limited or info:`, data["Note"] || data["Information"]);
      return null;
    }

    return data;
  } catch (err) {
    console.error(`[AlphaVantage] Fetch error:`, (err as Error).message);
    return null;
  }
}

export interface AVOverview {
  symbol: string;
  name: string;
  sector: string;
  industry: string;
  marketCap: number;
  peRatio: number | null;
  eps: number | null;
  dividendYield: number | null;
  profitMargin: number | null;
  revenuePerShareTTM: number | null;
  fiftyTwoWeekHigh: number | null;
  fiftyTwoWeekLow: number | null;
  analystTargetPrice: number | null;
  description: string;
}

/**
 * Fetch company overview / fundamentals
 */
export async function getOverview(ticker: string): Promise<AVOverview | null> {
  const data = await fetchAV({ function: "OVERVIEW", symbol: ticker });
  if (!data || !data["Symbol"]) return null;

  return {
    symbol: data["Symbol"],
    name: data["Name"] ?? "",
    sector: data["Sector"] ?? "",
    industry: data["Industry"] ?? "",
    marketCap: parseFloat(data["MarketCapitalization"]) || 0,
    peRatio: parseFloat(data["PERatio"]) || null,
    eps: parseFloat(data["EPS"]) || null,
    dividendYield: parseFloat(data["DividendYield"]) || null,
    profitMargin: parseFloat(data["ProfitMargin"]) || null,
    revenuePerShareTTM: parseFloat(data["RevenuePerShareTTM"]) || null,
    fiftyTwoWeekHigh: parseFloat(data["52WeekHigh"]) || null,
    fiftyTwoWeekLow: parseFloat(data["52WeekLow"]) || null,
    analystTargetPrice: parseFloat(data["AnalystTargetPrice"]) || null,
    description: data["Description"] ?? "",
  };
}

export interface AVIncomeStatement {
  fiscalYear: string;
  totalRevenue: number;
  netIncome: number;
  grossProfit: number;
  operatingIncome: number;
}

/**
 * Fetch annual income statements (up to 5 years)
 */
export async function getIncomeStatement(ticker: string): Promise<AVIncomeStatement[]> {
  const data = await fetchAV({ function: "INCOME_STATEMENT", symbol: ticker });
  if (!data || !data["annualReports"]) return [];

  return data["annualReports"].slice(0, 5).map((report: any) => ({
    fiscalYear: report["fiscalDateEnding"]?.slice(0, 4) ?? "",
    totalRevenue: parseFloat(report["totalRevenue"]) || 0,
    netIncome: parseFloat(report["netIncome"]) || 0,
    grossProfit: parseFloat(report["grossProfit"]) || 0,
    operatingIncome: parseFloat(report["operatingIncome"]) || 0,
  }));
}

export interface AVNewsSentiment {
  title: string;
  url: string;
  source: string;
  publishedAt: string;
  overallSentiment: string;
  sentimentScore: number;
  relevanceScore: number;
}

/**
 * Fetch news sentiment for a ticker.
 * Returns the top 10 most relevant articles with sentiment scores.
 */
export async function getNewsSentiment(ticker: string): Promise<AVNewsSentiment[]> {
  const data = await fetchAV({
    function: "NEWS_SENTIMENT",
    tickers: ticker,
    limit: "10",
    sort: "RELEVANCE",
  });

  if (!data || !data["feed"]) return [];

  return data["feed"].slice(0, 10).map((article: any) => {
    // Find the ticker-specific sentiment from the ticker_sentiment array
    const tickerSentiment = article["ticker_sentiment"]?.find(
      (ts: any) => ts["ticker"] === ticker
    );

    return {
      title: article["title"] ?? "",
      url: article["url"] ?? "",
      source: article["source"] ?? "",
      publishedAt: article["time_published"] ?? "",
      overallSentiment: article["overall_sentiment_label"] ?? "Neutral",
      sentimentScore: parseFloat(article["overall_sentiment_score"]) || 0,
      relevanceScore: parseFloat(tickerSentiment?.["relevance_score"]) || 0,
    };
  });
}
