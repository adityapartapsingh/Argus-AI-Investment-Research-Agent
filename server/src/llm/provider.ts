import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatOpenAI } from "@langchain/openai";
import type { BaseChatModel } from "@langchain/core/language_models/chat_models";

/**
 * Dual-LLM provider with automatic failover.
 * Primary: Google Gemini 2.0 Flash (free tier, fast inference)
 * Fallback: OpenAI GPT-4o-mini (paid, reliable backup)
 *
 * Why this pattern:
 *  - Gemini free tier has occasional rate limits under burst traffic
 *  - OpenAI is more expensive but rarely fails
 *  - Production systems should never have a single point of LLM failure
 */

let primaryModel: BaseChatModel | null = null;
let fallbackModel: BaseChatModel | null = null;

function getPrimary(): BaseChatModel {
  if (!primaryModel) {
    primaryModel = new ChatGoogleGenerativeAI({
      model: "gemini-2.0-flash",
      apiKey: process.env.GOOGLE_API_KEY,
      temperature: 0.3, // Low temp for analytical consistency
      maxOutputTokens: 4096,
    });
  }
  return primaryModel;
}

function getFallback(): BaseChatModel | null {
  if (!process.env.OPENAI_API_KEY) return null;
  if (!fallbackModel) {
    fallbackModel = new ChatOpenAI({
      model: "gpt-4o-mini",
      apiKey: process.env.OPENAI_API_KEY,
      temperature: 0.3,
      maxTokens: 4096,
    });
  }
  return fallbackModel;
}

/**
 * Returns the primary LLM. Use `invokeWithFallback` for production calls
 * that need automatic failover.
 */
export function getLLM(): BaseChatModel {
  return getPrimary();
}

/**
 * Invoke a prompt with automatic failover.
 * Tries Gemini first, falls back to OpenAI if Gemini throws.
 * Logs which provider served the request for observability.
 */
export async function invokeWithFallback(
  messages: Parameters<BaseChatModel["invoke"]>[0],
  tag: string = "unknown"
): Promise<{ content: string; provider: string }> {
  try {
    const response = await getPrimary().invoke(messages);
    const text = typeof response.content === "string"
      ? response.content
      : JSON.stringify(response.content);
    console.log(`[LLM] ${tag} served by: Gemini`);
    return { content: text, provider: "gemini" };
  } catch (err) {
    console.warn(`[LLM] Gemini failed for ${tag}:`, (err as Error).message);

    const fallback = getFallback();
    if (!fallback) {
      throw new Error(
        `Primary LLM (Gemini) failed and no fallback configured. Set OPENAI_API_KEY for redundancy. Original error: ${(err as Error).message}`
      );
    }

    try {
      const response = await fallback.invoke(messages);
      const text = typeof response.content === "string"
        ? response.content
        : JSON.stringify(response.content);
      console.log(`[LLM] ${tag} served by: OpenAI (fallback)`);
      return { content: text, provider: "openai-fallback" };
    } catch (fallbackErr) {
      throw new Error(
        `Both LLM providers failed for ${tag}. Gemini: ${(err as Error).message}. OpenAI: ${(fallbackErr as Error).message}`
      );
    }
  }
}
