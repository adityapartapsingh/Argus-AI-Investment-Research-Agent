import { useState } from "react";
import { Search, Loader2 } from "lucide-react";

interface InputPanelProps {
  onSubmit: (companyName: string) => void;
  isStreaming: boolean;
  onCancel: () => void;
}

export default function InputPanel({ onSubmit, isStreaming, onCancel }: InputPanelProps) {
  const [companyName, setCompanyName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) return;
    onSubmit(companyName.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="bg-surface-raised border border-border-subtle rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Search className="w-4 h-4 text-accent-blue" />
        <h2 className="text-sm font-bold text-text-primary uppercase tracking-wide">Research Terminal</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        {/* Company Name */}
        <div className="flex-1">
          <label className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-1.5 block">
            Company, Stock, or ETF Name
          </label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="e.g. Apple, Reliance Industries, VOO"
            className="input-focus w-full bg-surface-base border border-border-default rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted font-medium"
            disabled={isStreaming}
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-end min-w-[200px]">
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
