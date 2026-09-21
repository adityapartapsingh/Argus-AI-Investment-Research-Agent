import { useState } from "react";
import { Clock, TrendingUp, TrendingDown, Search, Loader2, BookOpen, ChevronRight, X } from "lucide-react";
import type { HistorySession } from "../../types/research";

interface SidebarProps {
  sessions: HistorySession[];
  loading: boolean;
  onSelectSession: (session: HistorySession) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export default function Sidebar({
  sessions,
  loading,
  onSelectSession,
  isOpenMobile = false,
  onCloseMobile,
}: SidebarProps) {
  const [filterQuery, setFilterQuery] = useState("");

  const filteredSessions = sessions.filter((s) =>
    s.companyName.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const handleSelect = (session: HistorySession) => {
    onSelectSession(session);
    if (onCloseMobile) onCloseMobile();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full overflow-hidden bg-white select-none">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-landing-outline">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-landing-primary">
            <BookOpen className="w-4 h-4 text-landing-secondary" />
            <h2 className="font-newsreader text-base font-semibold tracking-tight">
              Research Activity
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-semibold text-landing-tertiary bg-landing-surface-dim px-2 py-0.5 rounded border border-landing-outline">
              {sessions.length} dossiers
            </span>
            {onCloseMobile && (
              <button
                onClick={onCloseMobile}
                className="md:hidden p-1 rounded hover:bg-landing-surface-dim text-landing-tertiary hover:text-landing-primary transition-colors cursor-pointer"
                title="Close drawer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Quick Search in History */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-landing-tertiary" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Filter past sessions..."
            className="w-full bg-landing-surface-dim border border-landing-outline rounded pl-8 pr-3 py-1.5 text-xs text-landing-text-primary placeholder:text-landing-tertiary/70 focus:outline-none focus:border-landing-primary transition-colors"
          />
        </div>
      </div>

      {/* Search History List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
        {loading && (
          <div className="flex flex-col items-center justify-center py-10 text-landing-tertiary gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-landing-secondary" />
            <span className="text-xs">Loading dossiers...</span>
          </div>
        )}

        {!loading && sessions.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="w-10 h-10 rounded-full bg-landing-surface-dim flex items-center justify-center mb-3 text-landing-tertiary">
              <Clock className="w-5 h-5" />
            </div>
            <p className="text-xs font-semibold text-landing-primary">No Dossiers Yet</p>
            <p className="text-[11px] text-landing-tertiary mt-1 leading-normal">
              Execute your first equity analysis to populate your archive.
            </p>
          </div>
        )}

        {!loading && sessions.length > 0 && filteredSessions.length === 0 && (
          <div className="py-8 text-center text-xs text-landing-tertiary">
            No matches found for "{filterQuery}"
          </div>
        )}

        {filteredSessions.map((session) => (
          <button
            key={session.id}
            onClick={() => handleSelect(session)}
            className="group w-full text-left p-3 rounded border border-transparent hover:border-landing-outline hover:bg-landing-surface-dim transition-all cursor-pointer bg-white"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-landing-primary truncate max-w-[150px] group-hover:text-landing-secondary transition-colors">
                {session.companyName}
              </span>
              {session.decision && (
                <span
                  className={`badge text-[9px] ${
                    session.decision === "INVEST"
                      ? "bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/30"
                      : session.decision === "PASS"
                      ? "bg-accent-red/10 text-accent-red border border-accent-red/30"
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}
                >
                  {session.decision === "INVEST" ? (
                    <TrendingUp className="w-2.5 h-2.5" />
                  ) : (
                    <TrendingDown className="w-2.5 h-2.5" />
                  )}
                  {session.decision}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between text-[10px] text-landing-tertiary font-mono">
              <span>
                {session.compositeScore != null ? (
                  <span className="font-semibold text-landing-primary">
                    Score: {session.compositeScore}/100
                  </span>
                ) : (
                  "Completed"
                )}
              </span>
              <span className="flex items-center gap-1 group-hover:translate-x-0.5 transition-transform text-[11px]">
                {session.executionTimeMs && `${(session.executionTimeMs / 1000).toFixed(1)}s`}
                <ChevronRight className="w-3 h-3 text-landing-tertiary opacity-40 group-hover:opacity-100" />
              </span>
            </div>

            <div className="text-[9px] text-landing-tertiary/80 mt-1 font-mono">
              {new Date(session.createdAt).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-landing-outline bg-landing-surface-dim">
        <p className="text-[10px] text-landing-tertiary text-center font-mono">
          Argus Institutional Terminal • v2.0
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Docked Sidebar */}
      <aside className="hidden md:flex w-[280px] min-w-[280px] border-r border-landing-outline h-screen overflow-hidden">
        {sidebarContent}
      </aside>

      {/* Mobile Slide-Over Drawer with Overlay */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 md:hidden flex animate-fade-in">
          {/* Backdrop Blur Overlay */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
            aria-hidden="true"
          />

          {/* Sliding Drawer Container */}
          <div className="relative w-[300px] max-w-[85vw] h-full shadow-2xl z-10 animate-slide-up">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
