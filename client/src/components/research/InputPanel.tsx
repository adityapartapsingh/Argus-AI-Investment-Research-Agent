import { useState } from "react";
import { Search, Globe, Loader2 } from "lucide-react";

interface InputPanelProps {
  onSubmit: (companyName: string, ticker: string, region: string) => void;
  isStreaming: boolean;
  onCancel: () => void;
}

export default function InputPanel({ onSubmit, isStreaming, onCancel }: InputPanelProps) {
  const [companyName, setCompanyName] = useState("");
  const [ticker, setTicker] = useState("");
  const [region, setRegion] = useState("US");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) return;
    onSubmit(companyName.trim(), ticker.trim(), region);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-surface-raised border border-border-subtle rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Search className="w-4 h-4 text-accent-blue" />
        <h2 className="text-sm font-bold text-text-primary uppercase tracking-wide">Research Terminal</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {/* Company Name */}
        <div className="md:col-span-1">
          <label className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-1.5 block">
            Company
          </label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="e.g. Reliance Industries"
            className="input-focus w-full bg-surface-base border border-border-default rounded-xl px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted font-medium"
            disabled={isStreaming}
          />
        </div>

        {/* Ticker (Optional) */}
        <div>
          <label className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-1.5 block">
            Ticker <span className="text-text-muted opacity-60">(optional)</span>
          </label>
          <input
            type="text"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            placeholder="e.g. RELIANCE.NS"
            className="input-focus w-full bg-surface-base border border-border-default rounded-xl px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted font-mono"
            disabled={isStreaming}
          />
        </div>

        {/* Region */}
        <div>
          <label className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-1.5 block">
            <Globe className="w-3 h-3 inline mr-1" />
            Market Region
          </label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="input-focus w-full bg-surface-base border border-border-default rounded-xl px-3 py-2.5 text-sm text-text-primary font-semibold appearance-none cursor-pointer"
            disabled={isStreaming}
          >
            <option value="IN">🇮🇳 Indian Markets (NSE/BSE)</option>
            <option value="US">🇺🇸 US Markets (NASDAQ/NYSE)</option>
            <option value="GLOBAL">🌍 Global Markets</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex items-end">
          {isStreaming ? (
            <button
              type="button"
              onClick={onCancel}
              className="w-full bg-pass/10 hover:bg-pass/20 text-pass border border-pass/30 rounded-xl py-2.5 px-4 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Cancel Analysis
            </button>
          ) : (
            <button
              type="submit"
              disabled={!companyName.trim()}
              className="w-full bg-accent-blue hover:bg-accent-blue/90 disabled:bg-surface-overlay disabled:text-text-muted text-white rounded-xl py-2.5 px-4 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isStreaming && <Loader2 className="w-3 h-3 animate-spin" />}
              Run Analysis
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
