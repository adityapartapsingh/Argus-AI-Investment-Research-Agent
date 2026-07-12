import type { AgentStateType, ExecutionLog, CompetitorData } from "../state.js";
import { invokeWithFallback } from "../../llm/provider.js";
import { HumanMessage } from "@langchain/core/messages";
import * as yahoo from "../tools/yahooFinance.js";

/**
 * Node 5: Competitor Benchmarking
 *
 * Identifies top competitors in the same sector and fetches their
 * basic financial metrics for comparison. This gives the user context
 * on whether the target company is relatively strong or weak vs peers.
 *
 * Flow:
 *  1. LLM identifies 3 key competitors based on sector + company info
 *  2. Fetch Yahoo Finance data for each competitor in parallel
 *  3. Build comparison matrix
 */
export async function competitorBenchmark(
  state: AgentStateType
): Promise<Partial<AgentStateType>> {
  const startTime = Date.now();

  const logs: ExecutionLog[] = [
    {
      node: "competitorBenchmark",
      status: "running",
      message: `Identifying competitors for ${state.companyName} in ${state.sector || "the"} sector...`,
      timestamp: new Date().toISOString(),
    },
  ];

  try {
    // Step 1: Ask LLM to identify competitors
    const { content } = await invokeWithFallback(
      [
        new HumanMessage(
          `You are an equity research analyst. Identify the top 3 direct competitors for:

Company: ${state.companyName} (${state.resolvedTicker})
Sector: ${state.sector || "Unknown"}
Industry: ${state.industry || "Unknown"}
Region: ${state.region}

Return a JSON array of competitor tickers that can be looked up on Yahoo Finance.
For Indian companies, include the .NS suffix.
For US companies, use standard tickers.

Format (ONLY valid JSON, no other text):
[
  {"name": "Company Name", "ticker": "TICKER"},
  {"name": "Company Name", "ticker": "TICKER"},
  {"name": "Company Name", "ticker": "TICKER"}
]

Respond with ONLY valid JSON, no markdown fences.`
        ),
      ],
      "competitorBenchmark"
    );

    const competitorList = JSON.parse(
      content.replace(/```json?\n?/g, "").replace(/```/g, "").trim()
    ) as { name: string; ticker: string }[];

    // Step 2: Fetch data for each competitor in parallel
    const competitorPromises = competitorList.slice(0, 3).map(async (comp): Promise<CompetitorData> => {
      try {
        const quote = await yahoo.getQuote(comp.ticker);
        const financials = await yahoo.getFinancials(comp.ticker);

        return {
          name: comp.name,
          ticker: comp.ticker,
          peRatio: quote?.peRatio ?? null,
          marketCap: quote?.marketCap ?? null,
          revenueGrowth: financials?.revenueGrowthYoY ?? null,
          margin: financials?.operatingMargin ?? null,
        };
      } catch {
        return {
          name: comp.name,
          ticker: comp.ticker,
          peRatio: null,
          marketCap: null,
          revenueGrowth: null,
          margin: null,
        };
      }
    });

    const competitors = await Promise.all(competitorPromises);

    // Step 3: Generate competitive position summary
    const { content: positionSummary } = await invokeWithFallback(
      [
        new HumanMessage(
          `Compare ${state.companyName} against its competitors based on available data:

Target Company (${state.resolvedTicker}):
- P/E: ${state.quantitativeMetrics?.peRatio ?? "N/A"}
- Market Cap: ${state.quantitativeMetrics?.marketCap ?? "N/A"}
- Revenue Growth: ${state.quantitativeMetrics?.revenueGrowthYoY?.toFixed(1) ?? "N/A"}%
- Operating Margin: ${state.quantitativeMetrics?.operatingMargin != null ? (state.quantitativeMetrics.operatingMargin * 100).toFixed(1) : "N/A"}%

Competitors:
${competitors.map(c => `${c.name} (${c.ticker}): PE=${c.peRatio ?? "N/A"}, MCap=${c.marketCap ?? "N/A"}, Growth=${c.revenueGrowth?.toFixed(1) ?? "N/A"}%, Margin=${c.margin != null ? (c.margin * 100).toFixed(1) : "N/A"}%`).join("\n")}

Provide a 2-3 sentence competitive position summary. Is the target company a leader, follower, or laggard in its peer group? Focus on relative valuation and growth.`
        ),
      ],
      "competitorPosition"
    );

    const durationMs = Date.now() - startTime;

    logs.push({
      node: "competitorBenchmark",
      status: "completed",
      message: `Benchmarked against ${competitors.length} peers: ${competitors.map(c => c.name).join(", ")}.`,
      timestamp: new Date().toISOString(),
      durationMs,
      data: { competitors: competitors.map(c => c.ticker) },
    });

    return {
      competitors,
      competitivePosition: positionSummary.content || positionSummary.toString(),
      currentNode: "competitorBenchmark",
      executionLogs: logs,
    };
  } catch (err) {
    const durationMs = Date.now() - startTime;

    logs.push({
      node: "competitorBenchmark",
      status: "failed",
      message: `Competitor benchmarking failed: ${(err as Error).message}.`,
      timestamp: new Date().toISOString(),
      durationMs,
    });

    return {
      competitors: [],
      competitivePosition: "Competitor analysis could not be completed.",
      currentNode: "competitorBenchmark",
      executionLogs: logs,
    };
  }
}
