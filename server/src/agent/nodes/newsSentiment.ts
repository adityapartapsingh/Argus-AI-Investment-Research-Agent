import type { AgentStateType, ExecutionLog, QualitativeMetrics } from "../state.js";
import { invokeWithFallback } from "../../llm/provider.js";
import { HumanMessage } from "@langchain/core/messages";
import * as av from "../tools/alphaVantage.js";

/**
 * Node 3: News Sentiment Analysis
 *
 * Fetches recent news for the company and uses LLM to analyze
 * overall sentiment, extract key themes, risk factors, and catalysts.
 *
 * Data flow:
 *  1. Fetch news headlines from Alpha Vantage NEWS_SENTIMENT endpoint
 *  2. If AV fails (rate limit), use LLM's training data knowledge as fallback
 *  3. Send headlines to LLM with structured output prompt
 *  4. Return typed QualitativeMetrics object
 */
export async function newsSentiment(
  state: AgentStateType
): Promise<Partial<AgentStateType>> {
  const startTime = Date.now();
  const ticker = state.resolvedTicker;

  const logs: ExecutionLog[] = [
    {
      node: "newsSentiment",
      status: "running",
      message: `Scanning news sentiment for ${ticker}...`,
      timestamp: new Date().toISOString(),
    },
  ];

  try {
    // Fetch news from Alpha Vantage
    const cleanTicker = ticker.replace(/\.(NS|BO)$/, "");
    const newsArticles = await av.getNewsSentiment(cleanTicker);

    const hasRealNews = newsArticles.length > 0;

    // Build the analysis prompt
    const newsContext = hasRealNews
      ? `Recent news headlines for ${state.companyName} (${ticker}):\n${newsArticles
          .map((a, i) => `${i + 1}. "${a.title}" (${a.source}) — Raw sentiment: ${a.overallSentiment}, Score: ${a.sentimentScore}`)
          .join("\n")}`
      : `No recent news articles were found from our data feed. Use your knowledge of ${state.companyName} (${ticker}) in the ${state.sector || "unknown"} sector to provide a general sentiment assessment based on what you know about the company's recent trajectory.`;

    const { content } = await invokeWithFallback(
      [
        new HumanMessage(
          `You are a senior equity research analyst specializing in market sentiment analysis.

${newsContext}

Analyze the overall market sentiment for this company and respond in the following JSON format ONLY (no other text):

{
  "sentiment": "BULLISH" | "BEARISH" | "NEUTRAL",
  "sentimentScore": <number 0-100, where 0 is most bearish and 100 is most bullish>,
  "sentimentConfidence": <number 0-1, how confident you are in this assessment>,
  "themes": [<3-5 key themes/narratives driving the sentiment>],
  "riskFactors": [<3-5 specific risk factors for this company>],
  "catalysts": [<2-4 potential positive catalysts>],
  "newsHeadlines": [
    {"title": "<headline>", "source": "<source name>", "sentiment": "Positive|Negative|Neutral"}
  ]
}

${hasRealNews ? "Base your analysis primarily on the provided headlines." : "Base your analysis on your knowledge of this company's market position and recent developments."}
Respond with ONLY valid JSON, no markdown fences.`
        ),
      ],
      "newsSentiment"
    );

    // Parse the LLM response
    const parsed = JSON.parse(content.replace(/```json?\n?/g, "").replace(/```/g, "").trim());

    const qualMetrics: QualitativeMetrics = {
      sentiment: parsed.sentiment || "NEUTRAL",
      sentimentScore: Number(parsed.sentimentScore) || 50,
      sentimentConfidence: Number(parsed.sentimentConfidence) || 0.5,
      themes: parsed.themes || [],
      riskFactors: parsed.riskFactors || [],
      catalysts: parsed.catalysts || [],
      newsHeadlines: parsed.newsHeadlines || [],
    };

    const durationMs = Date.now() - startTime;

    logs.push({
      node: "newsSentiment",
      status: "completed",
      message: `Sentiment: ${qualMetrics.sentiment} (score: ${qualMetrics.sentimentScore}/100). ` +
        `Found ${qualMetrics.riskFactors.length} risk factors, ${qualMetrics.catalysts.length} catalysts. ` +
        `Data source: ${hasRealNews ? "Live news feed" : "LLM knowledge base"}.`,
      timestamp: new Date().toISOString(),
      durationMs,
      data: { sentiment: qualMetrics.sentiment, score: qualMetrics.sentimentScore, themes: qualMetrics.themes },
    });

    return {
      qualitativeMetrics: qualMetrics,
      currentNode: "newsSentiment",
      executionLogs: logs,
    };
  } catch (err) {
    const durationMs = Date.now() - startTime;

    logs.push({
      node: "newsSentiment",
      status: "failed",
      message: `Sentiment analysis failed: ${(err as Error).message}. Using neutral defaults.`,
      timestamp: new Date().toISOString(),
      durationMs,
    });

    // Return safe defaults — never block the pipeline
    return {
      qualitativeMetrics: {
        sentiment: "NEUTRAL",
        sentimentScore: 50,
        sentimentConfidence: 0.2,
        themes: ["Insufficient data for sentiment analysis"],
        riskFactors: ["Unable to assess current risk factors"],
        catalysts: [],
        newsHeadlines: [],
      },
      currentNode: "newsSentiment",
      executionLogs: logs,
    };
  }
}
