import type { AgentStateType, ExecutionLog } from "../state.js";
import YahooFinance from "yahoo-finance2";
const yf = new (YahooFinance as any)({ suppressNotices: ['yahooSurvey'] });

/**
 * Node 1: Intake Resolver
 *
 * Validates user input, resolves company name to ticker symbol,
 * and normalizes the ticker format for the target exchange.
 * Now using Yahoo Finance search instead of LLM for 0 API cost.
 */
export async function intakeResolver(
  state: AgentStateType
): Promise<Partial<AgentStateType>> {
  const startTime = Date.now();

  const logs: ExecutionLog[] = [
    {
      node: "intakeResolver",
      status: "running",
      message: `Resolving ticker for "${state.companyName}" using Yahoo Finance Search...`,
      timestamp: new Date().toISOString(),
    },
  ];

  try {
    let resolvedTicker = "";
    let exchange = "Unknown";
    let currency = "USD";
    let sector = "";
    let industry = "";
    let companyName = state.companyName;

    // Use Yahoo Search to resolve company name to ticker
    const searchResults = await yf.search(state.companyName);
    const equityQuotes = searchResults.quotes.filter((q: any) => q.quoteType === 'EQUITY');
    
    // Prioritize Indian exchanges (NSE, BSE)
    const indianMatch = equityQuotes.find((q: any) => q.symbol && (q.symbol.endsWith('.NS') || q.symbol.endsWith('.BO')));
    const bestMatch = indianMatch || equityQuotes[0] || searchResults.quotes[0];

    if (bestMatch && bestMatch.symbol) {
      resolvedTicker = bestMatch.symbol;
      companyName = bestMatch.longname || bestMatch.shortname || state.companyName;
      sector = bestMatch.sector || "";
      industry = bestMatch.industry || "";
    } else {
      throw new Error(`Could not find a stock symbol for "${state.companyName}"`);
    }

    // Determine exchange and currency from ticker suffix
    if (resolvedTicker.endsWith(".NS") || resolvedTicker.endsWith(".BO")) {
      exchange = resolvedTicker.endsWith(".NS") ? "NSE" : "BSE";
      currency = "INR";
    } else if (resolvedTicker.endsWith(".L")) {
      exchange = "LSE";
      currency = "GBP";
    } else if (resolvedTicker.endsWith(".KS") || resolvedTicker.endsWith(".KQ")) {
      exchange = resolvedTicker.endsWith(".KS") ? "KRX" : "KOSDAQ";
      currency = "KRW";
    } else if (resolvedTicker.endsWith(".T")) {
      exchange = "TSE";
      currency = "JPY";
    } else {
      exchange = "NASDAQ/NYSE";
      currency = "USD";
    }



    const durationMs = Date.now() - startTime;

    logs.push({
      node: "intakeResolver",
      status: "completed",
      message: `Resolved: ${companyName} (${resolvedTicker}) on ${exchange} (${currency})`,
      timestamp: new Date().toISOString(),
      durationMs,
      data: { resolvedTicker, exchange, currency, sector, industry },
    });

    return {
      companyName,
      resolvedTicker,
      exchange,
      currency,
      sector,
      industry,
      currentNode: "intakeResolver",
      executionLogs: logs,
    };
  } catch (err) {
    logs.push({
      node: "intakeResolver",
      status: "failed",
      message: `Resolution failed: ${(err as Error).message}`,
      timestamp: new Date().toISOString(),
      durationMs: Date.now() - startTime,
    });

    // Use the raw ticker input as fallback
    return {
      resolvedTicker: state.companyName.toUpperCase(),
      exchange: "Unknown",
      currency: "USD",
      currentNode: "intakeResolver",
      executionLogs: logs,
    };
  }
}
