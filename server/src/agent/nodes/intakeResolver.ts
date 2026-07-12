import type { AgentStateType, ExecutionLog } from "../state.js";
import { invokeWithFallback } from "../../llm/provider.js";
import { HumanMessage } from "@langchain/core/messages";

/**
 * Node 1: Intake Resolver
 *
 * Validates user input, resolves company name to ticker symbol,
 * and normalizes the ticker format for the target exchange.
 *
 * Why this node exists:
 *  - Users might type "Reliance" without knowing the ticker is "RELIANCE.NS"
 *  - We need to handle edge cases: "Apple" vs "Apple Hospitality REIT"
 *  - Sets up currency/exchange context for all downstream nodes
 */
export async function intakeResolver(
  state: AgentStateType
): Promise<Partial<AgentStateType>> {
  const startTime = Date.now();

  const logs: ExecutionLog[] = [
    {
      node: "intakeResolver",
      status: "running",
      message: `Resolving ticker for "${state.companyName}" in ${state.region} markets...`,
      timestamp: new Date().toISOString(),
    },
  ];

  try {
    let resolvedTicker = state.ticker;
    let exchange = "Unknown";
    let currency = "USD";

    // If user provided a ticker, normalize it
    if (state.ticker && state.ticker.trim().length > 0) {
      resolvedTicker = state.ticker.trim().toUpperCase();
    } else {
      // Use LLM to resolve company name to ticker
      const { content } = await invokeWithFallback(
        [
          new HumanMessage(
            `You are a financial data resolver. Given the company name "${state.companyName}" and target market region "${state.region}", return ONLY the stock ticker symbol.

Rules:
- For Indian (IN) markets: append .NS for NSE or .BO for BSE (prefer NSE)
- For US markets: return the standard NASDAQ/NYSE ticker
- For GLOBAL: return the most liquid exchange listing
- Return ONLY the ticker, nothing else. No explanation.

Example: "Reliance" + "IN" → "RELIANCE.NS"
Example: "Apple" + "US" → "AAPL"
Example: "Samsung" + "GLOBAL" → "005930.KS"

Company: ${state.companyName}
Region: ${state.region}
Ticker:`
          ),
        ],
        "intakeResolver"
      );
      resolvedTicker = content.trim().replace(/['"]/g, "");
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

    // For Indian region without suffix, auto-append .NS
    if (state.region === "IN" && !resolvedTicker.includes(".")) {
      resolvedTicker = `${resolvedTicker}.NS`;
      exchange = "NSE";
      currency = "INR";
    }

    const durationMs = Date.now() - startTime;

    logs.push({
      node: "intakeResolver",
      status: "completed",
      message: `Resolved: ${resolvedTicker} on ${exchange} (${currency})`,
      timestamp: new Date().toISOString(),
      durationMs,
      data: { resolvedTicker, exchange, currency },
    });

    return {
      resolvedTicker,
      exchange,
      currency,
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
      resolvedTicker: state.ticker || state.companyName.toUpperCase(),
      exchange: "Unknown",
      currency: state.region === "IN" ? "INR" : "USD",
      currentNode: "intakeResolver",
      executionLogs: logs,
    };
  }
}
