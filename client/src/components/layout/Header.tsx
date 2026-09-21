import { Zap, ArrowLeft, Globe, Activity, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
  sessionCount?: number;
}

export default function Header({ onToggleSidebar, isSidebarOpen, sessionCount = 0 }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-3 sm:px-6 py-3 border-b border-landing-outline bg-white/95 backdrop-blur-md sticky top-0 z-30 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
      {/* Left: Hamburger (Mobile) + Return to Home + Brand */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Mobile Hamburger Drawer Toggle */}
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded hover:bg-landing-surface-dim border border-landing-outline text-landing-primary cursor-pointer relative"
            title={isSidebarOpen ? "Close Dossier Drawer" : "Open Research Activity"}
            aria-label="Toggle Activity History"
          >
            {isSidebarOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <>
                <Menu className="w-4 h-4" />
                {sessionCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-landing-secondary text-landing-primary font-bold text-[9px] flex items-center justify-center shadow-xs">
                    {sessionCount}
                  </span>
                )}
              </>
            )}
          </button>
        )}

        <Link
          to="/"
          className="flex items-center gap-1.5 group text-landing-tertiary hover:text-landing-primary transition-colors text-xs font-semibold uppercase tracking-wider pr-2.5 sm:pr-3 border-r border-landing-outline"
          title="Return to Landing Page"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span className="hidden sm:inline">Home</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-landing-primary text-landing-secondary flex items-center justify-center font-newsreader font-bold text-base sm:text-lg shadow-sm">
            A
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-newsreader text-lg sm:text-xl font-bold text-landing-primary tracking-tight">
                Argus
              </span>
              <span className="text-[9px] sm:text-[10px] font-semibold text-landing-secondary bg-landing-secondary/10 px-1.5 sm:px-2 py-0.5 rounded border border-landing-secondary/20">
                PRO
              </span>
            </div>
            <p className="text-[9px] sm:text-[10px] font-medium text-landing-tertiary uppercase tracking-wider hidden xs:block">
              Equity Intelligence
            </p>
          </div>
        </div>
      </div>

      {/* Center: Live Market Status Ticker (Responsive) */}
      <div className="hidden lg:flex items-center gap-3.5 px-3.5 py-1.5 bg-landing-surface-dim rounded-full border border-landing-outline text-[11px] font-medium text-landing-text-secondary">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
          <span className="font-bold text-landing-primary font-mono">NSE:</span>
          <span>24,812.40</span>
          <span className="text-accent-emerald font-semibold">+0.65%</span>
        </div>
        <span className="text-landing-outline">•</span>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
          <span className="font-bold text-landing-primary font-mono">BSE:</span>
          <span>81,345.10</span>
          <span className="text-accent-emerald font-semibold">+0.58%</span>
        </div>
        <span className="text-landing-outline">•</span>
        <div className="flex items-center gap-1.5">
          <Globe className="w-3 h-3 text-landing-tertiary" />
          <span className="font-bold text-landing-primary font-mono">GLOBAL:</span>
          <span className="text-landing-tertiary">Active</span>
        </div>
      </div>

      {/* Right Controls & Telemetry Badge */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Compact market status for tablet/mobile */}
        <div className="flex lg:hidden items-center gap-1.5 px-2 py-1 bg-landing-surface-dim rounded border border-landing-outline text-[10px] font-mono text-landing-text-secondary">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse" />
          <span className="font-bold text-landing-primary">NSE:</span>
          <span className="text-accent-emerald">+0.65%</span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-landing-surface-dim rounded border border-landing-outline text-[10px] sm:text-[11px] text-landing-tertiary font-mono">
          <Activity className="w-3 h-3 text-accent-emerald animate-pulse" />
          <span>LangGraph</span>
        </div>

        <span className="badge bg-landing-primary text-white border border-landing-primary/20 text-[9px] sm:text-[10px] px-2 sm:px-2.5 py-1">
          <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-landing-secondary mr-1 inline" />
          <span className="hidden xs:inline">Single-Shot</span> AI
        </span>
      </div>
    </header>
  );
}
