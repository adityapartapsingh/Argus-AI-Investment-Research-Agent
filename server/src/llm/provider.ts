import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import type { BaseChatModel } from "@langchain/core/language_models/chat_models";




let primaryModel: BaseChatModel | null = null;
let fallbackModel: BaseChatModel | null = null;
let tertiaryModel: BaseChatModel | null = null;
// Force nodemon restart to reload .env

function getPrimary(): BaseChatModel {
  if (!primaryModel) {
    primaryModel = new ChatGoogleGenerativeAI({
      model: "gemini-3.5-flash",
      apiKey: process.env.GOOGLE_API_KEY,
      temperature: 0.3, // Low temp for analytical consistency
      maxOutputTokens: 8192, // Increased for massive single-shot output
    });
  }
  return primaryModel;
}

function getFallback(): BaseChatModel | null {
  if (!process.env.GEMINI_API_KEY_2) return null;
  if (!fallbackModel) {
    fallbackModel = new ChatGoogleGenerativeAI({
      model: "gemini-3.5-flash",
      apiKey: process.env.GEMINI_API_KEY_2,
      temperature: 0.3,
      maxOutputTokens: 8192,
    });
  }
  return fallbackModel;
}

function getTertiary(): BaseChatModel | null {
  if (!process.env.GEMINI_API_KEY_3) return null;
  if (!tertiaryModel) {
    tertiaryModel = new ChatGoogleGenerativeAI({
      model: "gemini-2.5-flash",
      apiKey: process.env.GEMINI_API_KEY_3,
      temperature: 0.3,
      maxOutputTokens: 8192,
    });
  }
  return tertiaryModel;
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
    console.warn(`[LLM] Primary Gemini failed for ${tag}:`, (err as Error).message);

    const fallback = getFallback();
    if (!fallback) {
      throw new Error(
        `Primary LLM (Gemini) failed and no fallback configured. Set GEMINI_API_KEY_2 for redundancy. Original error: ${(err as Error).message}`
      );
    }

    try {
      const response = await fallback.invoke(messages);
      const text = typeof response.content === "string"
        ? response.content
        : JSON.stringify(response.content);
      console.log(`[LLM] ${tag} served by: Gemini (fallback key)`);
      return { content: text, provider: "gemini-fallback" };
    } catch (fallbackErr) {
      console.warn(`[LLM] Secondary Gemini failed for ${tag}:`, (fallbackErr as Error).message);

      const tertiary = getTertiary();
      if (!tertiary) {
        throw new Error(
          `Both LLM providers failed for ${tag}. Primary: ${(err as Error).message}. Secondary: ${(fallbackErr as Error).message}`
        );
      }

      try {
        const response = await tertiary.invoke(messages);
        const text = typeof response.content === "string"
          ? response.content
          : JSON.stringify(response.content);
        console.log(`[LLM] ${tag} served by: Gemini (tertiary key)`);
        return { content: text, provider: "gemini-tertiary" };
      } catch (tertiaryErr) {
        throw new Error(
          `All three LLM providers failed for ${tag}. Primary: ${(err as Error).message}. Secondary: ${(fallbackErr as Error).message}. Tertiary: ${(tertiaryErr as Error).message}`
        );
      }
    }
  }
}
