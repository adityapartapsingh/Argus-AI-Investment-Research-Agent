import { useState, useCallback, useRef } from "react";
import type { ExecutionLog, ResearchResult } from "../types/research";

/**
 * Custom hook for managing the SSE research stream.
 *
 * Handles:
 *  - Initiating the POST request
 *  - Reading the SSE text/event-stream response
 *  - Parsing progressive node updates
 *  - Building the final result state
 *  - Error handling and cleanup
 *
 * Returns a clean API for the UI to consume without worrying about
 * stream mechanics.
 */

interface UseResearchStreamReturn {
  startResearch: (companyName: string, ticker: string, region: string) => void;
  cancelResearch: () => void;
  isStreaming: boolean;
  logs: ExecutionLog[];
  result: ResearchResult | null;
  error: string | null;
  sessionId: string | null;
}

export function useResearchStream(): UseResearchStreamReturn {
  const [isStreaming, setIsStreaming] = useState(false);
  const [logs, setLogs] = useState<ExecutionLog[]>([]);
  const [result, setResult] = useState<ResearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const cancelResearch = useCallback(() => {
    abortRef.current?.abort();
    setIsStreaming(false);
  }, []);

  const startResearch = useCallback(
    async (companyName: string, ticker: string, region: string) => {
      // Reset state
      setIsStreaming(true);
      setLogs([]);
      setResult(null);
      setError(null);
      setSessionId(null);

      // Create abort controller for cancellation
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const response = await fetch("/api/research", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ companyName, ticker, region }),
          signal: controller.signal,
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error || `Server error: ${response.status}`);
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) {
          throw new Error("No response stream available");
        }

        let buffer = "";

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          // SSE messages are separated by double newlines
          const messages = buffer.split("\n\n");
          // Keep the last potentially incomplete message in the buffer
          buffer = messages.pop() || "";

          for (const message of messages) {
            const lines = message.split("\n");

            for (const line of lines) {
              if (!line.startsWith("data: ")) continue;

              try {
                const data = JSON.parse(line.slice(6));

                // Handle system events
                if (data.node === "system") {
                  if (data.sessionId) {
                    setSessionId(data.sessionId);
                  }
                  if (data.status === "complete" && data.result) {
                    setResult(data.result);
                  }
                  if (data.status === "error") {
                    setError(data.message);
                  }
                }

                // Add to logs (all events including system)
                setLogs((prev) => [...prev, {
                  node: data.node,
                  status: data.status,
                  message: data.message,
                  timestamp: data.timestamp || new Date().toISOString(),
                  durationMs: data.durationMs,
                  data: data.data,
                }]);
              } catch {
                // Skip unparseable lines
              }
            }
          }
        }
      } catch (err) {
        if ((err as Error).name === "AbortError") {
          // User cancelled — not an error
          setError(null);
        } else {
          setError((err as Error).message);
        }
      } finally {
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    []
  );

  return {
    startResearch,
    cancelResearch,
    isStreaming,
    logs,
    result,
    error,
    sessionId,
  };
}
