import { TrendingUp, TrendingDown, Shield } from "lucide-react";
import type { ResearchResult } from "../../types/research";

interface ScorecardProps {
  result: ResearchResult;
}

/**
 * Hero verdict card with dynamic border color:
 *  - Emerald green glow for INVEST
 *  - Crimson red glow for PASS
 */
export default function Scorecard({ result }: ScorecardProps) {
  const isInvest = result.decision === "INVEST";

  return (
    <div className={`rounded-2xl border-2 p-6 animate-slide-up ${
      isInvest ? "scorecard-invest" : "scorecard-pass"
    }`}>
      {/* Top Row: Decision + Score */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted bg-white/5 px-2 py-0.5 rounded-md">
              Agent Verdict
            </span>
          </div>
          <h2 className={`text-4xl font-black tracking-tighter ${
            isInvest ? "text-invest" : "text-pass"
          }`}>
            {result.decision}
          </h2>
        </div>
        <div className="text-right">
          {isInvest ? (
            <TrendingUp className="w-10 h-10 text-invest opacity-30" />
          ) : (
            <TrendingDown className="w-10 h-10 text-pass opacity-30" />
          )}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <MetricPill
          label="Composite Score"
          value={`${result.compositeScore}/100`}
          color={result.compositeScore >= 65 ? "emerald" : result.compositeScore >= 45 ? "amber" : "red"}
        />
        <MetricPill
          label="Confidence"
          value={`${result.confidenceLevel}%`}
          color={result.confidenceLevel >= 70 ? "emerald" : "amber"}
        />
        <MetricPill
          label="Risk Level"
          value={result.riskLevel}
          color={
            result.riskLevel === "LOW" ? "emerald" :
            result.riskLevel === "MEDIUM" ? "amber" :
            "red"
          }
        />
      </div>

      {/* Company Info Bar */}
      <div className="flex items-center gap-3 mb-4 text-xs text-text-secondary">
        <Shield className="w-3 h-3" />
        <span className="font-mono font-semibold">{result.ticker}</span>
        <span>•</span>
        <span>{result.exchange}</span>
        <span>•</span>
        <span>{result.sector}</span>
        <span>•</span>
        <span>{result.currency}</span>
      </div>

      {/* Reasoning Summary */}
      <div className="border-t border-white/10 pt-4">
        <h4 className="text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2">
          Investment Committee Analysis
        </h4>
        <div className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
          {result.reasoningSummary}
        </div>
      </div>
    </div>
  );
}

function MetricPill({ label, value, color }: { label: string; value: string; color: "emerald" | "amber" | "red" }) {
  const colorMap = {
    emerald: "bg-accent-emerald/10 text-accent-emerald border-accent-emerald/20",
    amber: "bg-accent-amber/10 text-accent-amber border-accent-amber/20",
    red: "bg-accent-red/10 text-accent-red border-accent-red/20",
  };

  return (
    <div className={`rounded-xl border px-3 py-2 text-center ${colorMap[color]}`}>
      <p className="text-[9px] font-semibold uppercase tracking-wider opacity-70 mb-0.5">{label}</p>
      <p className="text-lg font-black">{value}</p>
    </div>
  );
}
