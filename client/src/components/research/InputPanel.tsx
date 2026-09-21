import { useState } from "react";
import { Search, Loader2, Sparkles, XCircle } from "lucide-react";

interface InputPanelProps {
  onSubmit: (companyName: string) => void;
  isStreaming: boolean;
  onCancel: () => void;
}

export default function InputPanel({ onSubmit, isStreaming, onCancel }: InputPanelProps) {
  const [companyName, setCompanyName] = useState("");
  const [selectedMarket, setSelectedMarket] = useState<"ALL" | "IN" | "US">("IN");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) return;
    onSubmit(companyName.trim());
  };

  const handleQuickSelect = (ticker: string) => {
    setCompanyName(ticker);
    onSubmit(ticker);
  };

  return (
    <div className="bg-white border border-landing-outline rounded p-4 sm:p-6 shadow-sm">
      {/* Panel Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 border-b border-landing-outline pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-newsreader text-xl sm:text-2xl font-semibold text-landing-primary tracking-tight">
              Autonomous Equity Research
            </h2>
            <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-landing-secondary bg-landing-secondary/10 px-2 py-0.5 rounded border border-landing-secondary/20">
              <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              AI Pipeline
            </span>
          </div>
          <p className="text-xs text-landing-tertiary mt-1 leading-normal">
            Enter any Indian or global corporate name to resolve ticker, scrape audited fundamentals, and synthesize investment thesis.
          </p>
        </div>

        {/* Market Focus Selector (Mobile Responsive) */}
        <div className="flex items-center gap-1 p-1 bg-landing-surface-dim rounded border border-landing-outline text-xs self-stretch sm:self-auto justify-between sm:justify-start">
          <button
            type="button"
            onClick={() => setSelectedMarket("IN")}
            className={`flex-1 sm:flex-initial text-center px-2.5 py-1.5 rounded text-[11px] font-semibold transition-all cursor-pointer ${
              selectedMarket === "IN"
                ? "bg-landing-primary text-white shadow-xs"
                : "text-landing-tertiary hover:text-landing-primary"
            }`}
          >
            NSE / BSE
          </button>
          <button
            type="button"
            onClick={() => setSelectedMarket("US")}
            className={`flex-1 sm:flex-initial text-center px-2.5 py-1.5 rounded text-[11px] font-semibold transition-all cursor-pointer ${
              selectedMarket === "US"
                ? "bg-landing-primary text-white shadow-xs"
                : "text-landing-tertiary hover:text-landing-primary"
            }`}
          >
            US Markets
          </button>
          <button
            type="button"
            onClick={() => setSelectedMarket("ALL")}
            className={`flex-1 sm:flex-initial text-center px-2.5 py-1.5 rounded text-[11px] font-semibold transition-all cursor-pointer ${
              selectedMarket === "ALL"
                ? "bg-landing-primary text-white shadow-xs"
                : "text-landing-tertiary hover:text-landing-primary"
            }`}
          >
            Global
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-landing-tertiary" />
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Search e.g. Reliance, Tata Motors, Apple, HDFC Bank..."
              className="w-full bg-landing-surface-dim/70 border border-landing-outline rounded pl-10 sm:pl-11 pr-14 sm:pr-24 py-3 sm:py-3.5 text-xs sm:text-sm text-landing-text-primary placeholder:text-landing-tertiary/70 font-sans focus:outline-none focus:bg-white focus:border-landing-primary focus:ring-1 focus:ring-landing-primary transition-all"
              disabled={isStreaming}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1.5 pointer-events-none">
              <span className="text-[10px] font-mono font-medium text-landing-tertiary bg-white px-2 py-0.5 rounded border border-landing-outline shadow-xs">
                ↵ Enter
              </span>
            </div>
          </div>

          {/* Action Button */}
          <div className="w-full sm:w-auto flex items-center sm:min-w-[160px]">
            {isStreaming ? (
              <button
                type="button"
                onClick={onCancel}
                className="w-full bg-accent-red/10 hover:bg-accent-red/15 text-accent-red border border-accent-red/30 rounded py-3 sm:py-3.5 px-4 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <XCircle className="w-4 h-4" />
                Cancel
              </button>
            ) : (
              <button
                type="submit"
                disabled={!companyName.trim()}
                className="w-full bg-landing-primary hover:bg-landing-primary/90 disabled:bg-landing-surface-dim disabled:text-landing-tertiary/50 disabled:border-landing-outline text-white rounded py-3 sm:py-3.5 px-5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm active:scale-[0.99]"
              >
                {isStreaming ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-landing-secondary" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="w-3.5 h-3.5 text-landing-secondary" />
                    Run Diligence
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Quick-Fill Chips (Touch Horizontally Scrollable on Mobile) */}
        <div className="pt-1">
          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 -mx-1 px-1 scrollbar-none">
            <span className="text-[10px] sm:text-[11px] font-semibold text-landing-tertiary uppercase shrink-0">
              Quick:
            </span>
            {[
              { label: "Reliance", ticker: "RELIANCE.NS" },
              { label: "Tata Motors", ticker: "TATAMOTORS.NS" },
              { label: "HDFC Bank", ticker: "HDFCBANK.NS" },
              { label: "Apple", ticker: "AAPL" },
              { label: "NVIDIA", ticker: "NVDA" },
              { label: "Tesla", ticker: "TSLA" },
            ].map((item) => (
              <button
                key={item.ticker}
                type="button"
                onClick={() => handleQuickSelect(item.label)}
                disabled={isStreaming}
                className="shrink-0 text-[11px] font-medium text-landing-tertiary hover:text-landing-primary bg-landing-surface-dim hover:bg-white border border-landing-outline hover:border-landing-primary/40 rounded px-2.5 py-1 transition-all cursor-pointer disabled:opacity-50"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
