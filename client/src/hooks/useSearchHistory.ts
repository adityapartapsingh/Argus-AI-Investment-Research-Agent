import { useState, useEffect, useCallback } from "react";
import type { HistorySession } from "../types/research";

import { getBrowserSessionId } from "../utils/session";

/**
 * Custom hook for fetching search history from the API.
 */
export function useSearchHistory() {
  const [sessions, setSessions] = useState<HistorySession[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    try {
      const sessionId = getBrowserSessionId();
      const apiUrl = import.meta.env.VITE_API_URL || "";
      const res = await fetch(`${apiUrl}/api/history?limit=30&browserSessionId=${sessionId}`);
      if (!res.ok) throw new Error("Failed to fetch history");
      const data = await res.json();
      setSessions(data.sessions || []);
    } catch (err) {
      console.error("[History]", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return { sessions, loading, refetch: fetchHistory };
}
