import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import InputPanel from "./components/research/InputPanel";
import NodeStream from "./components/research/NodeStream";
import Scorecard from "./components/research/Scorecard";
import QuantMetrics from "./components/research/QuantMetrics";
import RevenueChart from "./components/research/RevenueChart";
import CompetitorTable from "./components/research/CompetitorTable";
import RiskSummary from "./components/research/RiskSummary";
import AnalyzingAnimation from "./components/research/AnalyzingAnimation";
import { useResearchStream } from "./hooks/useResearchStream";
import { useSearchHistory } from "./hooks/useSearchHistory";
import type { HistorySession } from "./types/research";
import { AlertCircle, BarChart2, ShieldCheck, ArrowRight, Zap, RefreshCw } from "lucide-react";
import LandingPage from "./components/landing/LandingPage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import heroImg from "./assets/hero.png";

/**
 * Root application dashboard matching the Argus Landing Page editorial design system,
 * fully responsive across phones, tablets, and desktop workstations.
 */
function AppDashboard() {
  const { startResearch, cancelResearch, isStreaming, logs, result, error, loadPastSession } =
    useResearchStream();
  const { sessions, loading: historyLoading, refetch: refetchHistory } = useSearchHistory();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Background warmup ping to ensure Render backend is awake
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || "";
    fetch(`${apiUrl}/api/health`, { method: "GET" }).catch(() => {});
  }, []);

  const handleSubmit = (companyName: string) => {
    startResearch(companyName);
    setIsSidebarOpen(false);
    setTimeout(refetchHistory, 2500);
  };

  const handleSelectSession = async (session: HistorySession) => {
    setIsSidebarOpen(false);
    await loadPastSession(session.id);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-landing-bg text-landing-text-primary antialiased">
      {/* Institutional Sidebar (Docked on desktop, Slide-Over drawer on mobile) */}
      <Sidebar
        sessions={sessions}
        loading={historyLoading}
        onSelectSession={handleSelectSession}
        isOpenMobile={isSidebarOpen}
        onCloseMobile={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Header
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
          isSidebarOpen={isSidebarOpen}
          sessionCount={sessions.length}
        />

        <main className="flex-1 overflow-y-auto p-3.5 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
          <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
            {/* Input Panel */}
            <InputPanel
              onSubmit={handleSubmit}
              isStreaming={isStreaming}
              onCancel={cancelResearch}
            />

            {/* Error Display */}
            {error && (
              <div className="bg-accent-red/5 border border-accent-red/30 rounded p-3.5 sm:p-4 flex items-start gap-3 animate-slide-up shadow-sm">
                <AlertCircle className="w-5 h-5 text-accent-red shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs sm:text-sm font-bold text-accent-red">Diligence Pipeline Error</p>
                  <p className="text-xs text-landing-text-secondary mt-1">{error}</p>
                </div>
              </div>
            )}

            {/* Live Node Stream Audit */}
            <NodeStream logs={logs} isStreaming={isStreaming} />

            {/* Animated Agent Radar Loader */}
            {isStreaming && !result && !error && <AnalyzingAnimation />}

            {/* Results Section */}
            {result && (
              <div className="space-y-4 sm:space-y-6 animate-fade-in">
                {/* Scorecard Hero Verdict */}
                <Scorecard result={result} />

                {/* Company Description Card */}
                {result.companyDescription && (
                  <div className="bg-white border border-landing-outline rounded p-4 sm:p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-2.5 sm:mb-3 border-b border-landing-outline pb-2.5">
                      <h3 className="font-newsreader text-lg sm:text-xl font-semibold text-landing-primary tracking-tight">
                        Company Overview & Business Profile
                      </h3>
                      <span className="text-[9px] sm:text-[10px] font-mono text-landing-tertiary uppercase hidden xs:inline">
                        Exchange Description
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-landing-text-secondary leading-relaxed font-sans">
                      {result.companyDescription}
                    </p>
                  </div>
                )}

                {/* Two-column layout for metrics & qualitative */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                  {/* Left: Charts and Quantitative Metrics (2 cols) */}
                  <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                    {result.quantitativeMetrics && (
                      <>
                        <QuantMetrics
                          metrics={result.quantitativeMetrics}
                          currency={result.currency}
                        />
                        <RevenueChart
                          metrics={result.quantitativeMetrics}
                          currency={result.currency}
                        />
                      </>
                    )}

                    {/* Competitor Benchmark Table */}
                    {result.competitors && result.competitors.length > 0 && (
                      <CompetitorTable
                        competitors={result.competitors}
                        targetTicker={result.ticker}
                        targetPE={result.quantitativeMetrics?.peRatio ?? null}
                        targetGrowth={result.quantitativeMetrics?.revenueGrowthYoY ?? null}
                        targetMargin={result.quantitativeMetrics?.operatingMargin ?? null}
                        targetMarketCap={result.quantitativeMetrics?.marketCap ?? null}
                      />
                    )}
                  </div>

                  {/* Right: Qualitative Analysis & Risks (1 col) */}
                  <div>
                    {result.qualitativeMetrics && (
                      <RiskSummary metrics={result.qualitativeMetrics} />
                    )}
                  </div>
                </div>

                {/* Bottom Action Bar (Mobile Responsive) */}
                <div className="bg-white border border-landing-outline rounded p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs text-landing-tertiary font-mono">
                    <span>Target: <strong className="text-landing-primary">{result.ticker}</strong></span>
                    <span>•</span>
                    <span>Verdict: <strong className="text-landing-primary">{result.decision}</strong></span>
                    <span>•</span>
                    <span>Score: {result.compositeScore}/100</span>
                  </div>
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-landing-primary hover:text-landing-secondary bg-landing-surface-dim hover:bg-landing-surface-dim/80 sm:bg-transparent py-2 px-3 sm:p-0 rounded transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    New Diligence Run
                  </button>
                </div>
              </div>
            )}

            {/* Empty State: Matching Landing Page Aesthetic with Photo & Visuals */}
            {!isStreaming && !result && !error && logs.length === 0 && (
              <div className="bg-white border border-landing-outline rounded p-5 sm:p-8 md:p-12 shadow-sm text-center">
                <div className="max-w-2xl mx-auto flex flex-col items-center">
                  {/* Visual 3D Asset / Graph Photo Badge */}
                  <div className="relative mb-4 sm:mb-6">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-landing-surface-dim border border-landing-outline flex items-center justify-center p-3 shadow-inner">
                      <img
                        src={heroImg}
                        alt="Argus Intelligence 3D Asset"
                        className="w-full h-full object-contain filter drop-shadow-md"
                      />
                    </div>
                    <span className="absolute -bottom-1.5 -right-1.5 sm:-bottom-2 sm:-right-2 bg-landing-secondary text-landing-primary text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                      AI 4.2
                    </span>
                  </div>

                  <h2 className="font-newsreader text-2xl sm:text-3xl md:text-4xl font-semibold text-landing-primary tracking-tight mb-2 sm:mb-3">
                    Institutional Equity Diligence Terminal
                  </h2>
                  <p className="font-sans text-xs sm:text-sm text-landing-text-secondary leading-relaxed max-w-lg mb-6 sm:mb-8">
                    Execute automated multi-factor research syntheses in under 10 seconds. Ingesting
                    real-time quotes, audited balance sheets, peer multiples, and single-shot
                    Gemini qualitative evaluation.
                  </p>

                  {/* 3 Pillar Feature Highlights (1-col on mobile, 3-col on tablet/desktop) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 w-full mb-6 sm:mb-8 text-left">
                    <div className="bg-landing-surface-dim border border-landing-outline rounded p-3.5 sm:p-4">
                      <Zap className="w-4 h-4 text-landing-secondary mb-1.5 sm:mb-2" />
                      <h4 className="text-xs font-bold text-landing-primary uppercase tracking-wider">
                        Sub-10s Synthesis
                      </h4>
                      <p className="text-[11px] text-landing-tertiary mt-1 leading-normal">
                        Single-shot LLM reasoning cuts analysis latency from 45s to 5s.
                      </p>
                    </div>

                    <div className="bg-landing-surface-dim border border-landing-outline rounded p-3.5 sm:p-4">
                      <BarChart2 className="w-4 h-4 text-landing-primary mb-1.5 sm:mb-2" />
                      <h4 className="text-xs font-bold text-landing-primary uppercase tracking-wider">
                        Zero-Auth Fundamentals
                      </h4>
                      <p className="text-[11px] text-landing-tertiary mt-1 leading-normal">
                        Sourcing live P/E, ROE, FCF, and 1-year historical prices from Yahoo.
                      </p>
                    </div>

                    <div className="bg-landing-surface-dim border border-landing-outline rounded p-3.5 sm:p-4">
                      <ShieldCheck className="w-4 h-4 text-accent-emerald mb-1.5 sm:mb-2" />
                      <h4 className="text-xs font-bold text-landing-primary uppercase tracking-wider">
                        Objective Verdict
                      </h4>
                      <p className="text-[11px] text-landing-tertiary mt-1 leading-normal">
                        Binary INVEST vs. PASS decision backed by composite alpha scoring.
                      </p>
                    </div>
                  </div>

                  {/* Quick-Start Stocks (Responsive wrapping on mobile) */}
                  <div className="w-full pt-4 border-t border-landing-outline">
                    <p className="text-[10px] sm:text-[11px] font-semibold text-landing-tertiary uppercase tracking-wider mb-3">
                      Select a Benchmark to Run Immediate Diligence
                    </p>
                    <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-2">
                      {[
                        { name: "Reliance", ticker: "RELIANCE.NS" },
                        { name: "Tata Motors", ticker: "TATAMOTORS.NS" },
                        { name: "Apple", ticker: "AAPL" },
                        { name: "Tesla", ticker: "TSLA" },
                        { name: "HDFC Bank", ticker: "HDFCBANK.NS" },
                        { name: "NVIDIA", ticker: "NVDA" },
                      ].map((stock) => (
                        <button
                          key={stock.ticker}
                          onClick={() => handleSubmit(stock.name)}
                          className="group flex items-center justify-between sm:justify-start gap-1.5 sm:gap-2 bg-landing-surface-dim hover:bg-landing-primary hover:text-white border border-landing-outline rounded px-3 py-2 text-xs font-semibold text-landing-text-primary transition-all cursor-pointer shadow-2xs"
                        >
                          <span className="truncate">{stock.name}</span>
                          <span className="font-mono text-[9px] sm:text-[10px] opacity-70 group-hover:opacity-100 group-hover:text-landing-secondary shrink-0">
                            {stock.ticker}
                          </span>
                          <ArrowRight className="w-3 h-3 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 hidden xs:inline" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<AppDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}