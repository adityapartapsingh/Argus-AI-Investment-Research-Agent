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
import { useResearchStream } from "./hooks/useResearchStream";
import { useSearchHistory } from "./hooks/useSearchHistory";
import type { HistorySession } from "./types/research";
import { AlertCircle } from "lucide-react";

/**
 * Root application layout:
 *
 *  ┌──────────┬──────────────────────────────────┐
 *  │          │  Header                          │
 *  │          ├──────────────────────────────────│
 *  │ Sidebar  │  InputPanel                      │
 *  │ (280px)  │  NodeStream                      │
 *  │          │  Scorecard                       │
 *  │          │  ┌────────────────┬─────────────┐│
 *  │          │  │ Charts/Metrics │ Risk/Qualit.││
 *  │          │  └────────────────┴─────────────┘│
 *  └──────────┴──────────────────────────────────┘
 */
export default function App() {
  const { startResearch, cancelResearch, isStreaming, logs, result, error } = useResearchStream();
  const { sessions, loading: historyLoading, refetch: refetchHistory } = useSearchHistory();

  const handleSubmit = (companyName: string, ticker: string, region: string) => {
    startResearch(companyName, ticker, region);
    // Refetch history after a delay to pick up the new session
    setTimeout(refetchHistory, 2000);
  };

  const handleSelectSession = async (session: HistorySession) => {
    // TODO: Load full session details from /api/history/:id
    // For now, just trigger a new research for the same company
    startResearch(session.companyName, session.ticker, session.region);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        sessions={sessions}
        loading={historyLoading}
        onSelectSession={handleSelectSession}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Input Panel */}
          <InputPanel
            onSubmit={handleSubmit}
            isStreaming={isStreaming}
            onCancel={cancelResearch}
          />

          {/* Error Display */}
          {error && (
            <div className="bg-pass/10 border border-pass/30 rounded-2xl p-4 flex items-start gap-3 animate-slide-up">
              <AlertCircle className="w-5 h-5 text-pass flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-pass">Analysis Error</p>
                <p className="text-xs text-text-secondary mt-1">{error}</p>
              </div>
            </div>
          )}

          {/* Live Node Stream */}
          <NodeStream logs={logs} isStreaming={isStreaming} />

          {/* Results Section */}
          {result && (
            <div className="space-y-5">
              {/* Scorecard */}
              <Scorecard result={result} />

              {/* Two-column layout for metrics */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Left: Charts and Metrics (2 cols) */}
                <div className="lg:col-span-2 space-y-5">
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

                  {/* Competitor Table */}
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

                {/* Right: Qualitative Analysis (1 col) */}
                <div>
                  {result.qualitativeMetrics && (
                    <RiskSummary metrics={result.qualitativeMetrics} />
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!isStreaming && !result && !error && logs.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-xl font-bold text-text-primary mb-2">Ready to Analyze</h2>
              <p className="text-sm text-text-secondary max-w-md">
                Enter a company name above to run a comprehensive AI-powered investment research analysis
                across financial metrics, market sentiment, and competitive positioning.
              </p>
              <div className="flex gap-3 mt-6">
                <QuickButton label="Reliance" ticker="RELIANCE.NS" region="IN" onSubmit={handleSubmit} />
                <QuickButton label="Apple" ticker="AAPL" region="US" onSubmit={handleSubmit} />
                <QuickButton label="HDFC Bank" ticker="HDFCBANK.NS" region="IN" onSubmit={handleSubmit} />
                <QuickButton label="Tesla" ticker="TSLA" region="US" onSubmit={handleSubmit} />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function QuickButton({
  label, ticker, region, onSubmit
}: {
  label: string; ticker: string; region: string;
  onSubmit: (name: string, ticker: string, region: string) => void;
}) {
  return (
    <button
      onClick={() => onSubmit(label, ticker, region)}
      className="text-xs font-semibold text-text-secondary bg-surface-raised border border-border-subtle rounded-xl px-4 py-2 hover:border-accent-blue hover:text-accent-blue transition-colors cursor-pointer"
    >
      {label}
    </button>
  );
}