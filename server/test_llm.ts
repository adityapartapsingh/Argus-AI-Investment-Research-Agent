/// <reference types="node" />
import "dotenv/config";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

async function run() {
  console.log("Testing fallback key with gemini-3.5-flash...");
  const model = new ChatGoogleGenerativeAI({
    model: "gemini-3.5-flash",
    apiKey: process.env.GEMINI_API_KEY_2,
  });

  try {
    const res = await model.invoke("Hello, say 'API IS WORKING' if you can read this.");
    console.log("Success:", res.content);
  } catch (err: any) {
    console.error("Error with fallback key:", err.message);
  }
}

run();
