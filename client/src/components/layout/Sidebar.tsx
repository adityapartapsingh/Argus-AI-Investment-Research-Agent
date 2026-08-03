import { Clock, TrendingUp, TrendingDown, Search, Loader2 } from "lucide-react";
import type { HistorySession } from "../../types/research";

interface SidebarProps {
  sessions: HistorySession[];
  loading: boolean;
  onSelectSession: (session: HistorySession) => void;
}

export default function Sidebar({ sessions, loading, onSelectSession }: SidebarProps) {
  return (
    <aside className="w-[280px] min-w-[280px] border-r border-border-subtle bg-surface-primary flex flex-col h-screen overflow-hidden">
      {/* Sidebar Header */}
      <div className="px-4 py-4 border-b border-border-subtle">
        <div className="flex items-center gap-2 text-text-secondary">
          <Clock className="w-3.5 h-3.5" />
          <span className="text-xs font-semibold uppercase tracking-wider">Recent Activity</span>
        </div>
      </div>

      {/* Search History */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {loading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-4 h-4 text-text-muted animate-spin-slow" />
          </div>
        )}

        {!loading && sessions.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <Search className="w-8 h-8 text-text-muted mb-3 opacity-40" />
            <p className="text-xs text-text-muted font-medium">No research sessions yet</p>
            <p className="text-[10px] text-text-muted mt-1">Start your first analysis above</p>
          </div>
        )}

        {sessions.map((session) => (
          <button
            key={session.id}
            onClick={() => onSelectSession(session)}
            className="history-item w-full text-left p-3 rounded-xl border border-transparent cursor-pointer bg-transparent"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-text-primary truncate max-w-[160px]">
                {session.companyName}
              </span>
              {session.decision && (
                <span className={`badge text-[9px] ${
                  session.decision === "INVEST"
                    ? "bg-invest/10 text-invest border border-invest/20"
                    : session.decision === "PASS"
                    ? "bg-pass/10 text-pass border border-pass/20"
                    : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                }`}>
                  {session.decision === "INVEST" ? (
                    <TrendingUp className="w-2.5 h-2.5" />
                  ) : (
                    <TrendingDown className="w-2.5 h-2.5" />
                  )}
                  {session.decision}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-[10px] text-text-muted">
              {session.compositeScore != null && (
                <>
                  <span>{session.compositeScore}/100</span>
                </>
              )}
            </div>
            <div className="text-[9px] text-text-muted mt-1.5 font-mono">
              {new Date(session.createdAt).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
              })}
              {session.executionTimeMs && (
                <span className="ml-2">⏱ {(session.executionTimeMs / 1000).toFixed(1)}s</span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-border-subtle">
        <p className="text-[9px] text-text-muted text-center font-mono">
          Argus Research Terminal • v1.0
        </p>
      </div>
    </aside>
  );
}
