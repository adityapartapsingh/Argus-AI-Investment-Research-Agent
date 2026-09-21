import { TrendingUp, TrendingDown, Shield, Award, AlertTriangle } from "lucide-react";
import type { ResearchResult } from "../../types/research";

interface ScorecardProps {
  result: ResearchResult;
}

export default function Scorecard({ result }: ScorecardProps) {
  const isInvest = result.decision === "INVEST";

  return (
    <div
      className={`rounded border-2 p-4 sm:p-6 md:p-8 animate-slide-up bg-white shadow-sm ${
        isInvest ? "scorecard-invest border-accent-emerald/40" : "scorecard-pass border-accent-red/40"
      }`}
    >
      {/* Top Banner: Verdict + High-Level Decision */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-5 border-b border-landing-outline/80 pb-5">
        <div>
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5">
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-landing-secondary bg-landing-secondary/10 px-2 sm:px-2.5 py-0.5 rounded border border-landing-secondary/20">
              Institutional Committee Verdict
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono text-landing-tertiary">
              Argus AI v4.2
            </span>
          </div>

          <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
            <h2
              className={`font-newsreader text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight ${
                isInvest ? "text-accent-emerald" : "text-accent-red"
              }`}
            >
              {result.decision}
            </h2>
            <span className="text-xs sm:text-sm font-semibold text-landing-tertiary uppercase tracking-wider">
              {isInvest ? "• Overweight Conviction" : "• Underweight / Neutral"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-start">
          <div
            className={`w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border-2 ${
              isInvest
                ? "bg-accent-emerald/10 border-accent-emerald/30 text-accent-emerald"
                : "bg-accent-red/10 border-accent-red/30 text-accent-red"
            }`}
          >
            {isInvest ? (
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8" />
            ) : (
              <TrendingDown className="w-6 h-6 sm:w-8 sm:h-8" />
            )}
          </div>
        </div>
      </div>

      {/* Metrics Row / Score Gauge (Responsive 1-col on mobile, 3-col on tablet/desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        {/* Composite Alpha Score */}
        <div className="bg-landing-surface-dim border border-landing-outline rounded p-3.5 sm:p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-landing-tertiary text-xs mb-1">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Composite Alpha</span>
            <Award className="w-3.5 h-3.5 text-landing-secondary" />
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="font-newsreader text-2xl sm:text-3xl font-bold text-landing-primary">
              {result.compositeScore}
            </span>
            <span className="text-xs font-mono text-landing-tertiary">/100</span>
          </div>
          {/* Visual Mini Progress Bar */}
          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-2.5">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${
                result.compositeScore >= 70
                  ? "bg-accent-emerald"
                  : result.compositeScore >= 50
                  ? "bg-amber-500"
                  : "bg-accent-red"
              }`}
              style={{ width: `${Math.min(100, Math.max(0, result.compositeScore))}%` }}
            />
          </div>
        </div>

        {/* Model Confidence */}
        <div className="bg-landing-surface-dim border border-landing-outline rounded p-3.5 sm:p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-landing-tertiary text-xs mb-1">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Model Confidence</span>
            <Shield className="w-3.5 h-3.5 text-landing-primary" />
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="font-newsreader text-2xl sm:text-3xl font-bold text-landing-primary">
              {result.confidenceLevel}%
            </span>
            <span className="text-xs font-sans text-landing-tertiary">Probability</span>
          </div>
          <p className="text-[10px] text-landing-tertiary mt-2.5 font-mono">
            Statistical convergence verified
          </p>
        </div>

        {/* Risk Profile */}
        <div className="bg-landing-surface-dim border border-landing-outline rounded p-3.5 sm:p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-landing-tertiary text-xs mb-1">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Risk Profile</span>
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span
              className={`font-newsreader text-xl sm:text-2xl font-bold ${
                result.riskLevel === "LOW"
                  ? "text-accent-emerald"
                  : result.riskLevel === "MEDIUM"
                  ? "text-amber-600"
                  : "text-accent-red"
              }`}
            >
              {result.riskLevel} RISK
            </span>
          </div>
          <p className="text-[10px] text-landing-tertiary mt-2.5 font-mono">
            Volatility stress-tested
          </p>
        </div>
      </div>

      {/* Company Metadata Breadcrumb Bar */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 py-2 px-3 bg-landing-surface-dim rounded border border-landing-outline text-[11px] sm:text-xs text-landing-text-secondary mb-5 font-mono">
        <span className="font-bold text-landing-primary bg-white px-2 py-0.5 rounded border border-landing-outline">
          {result.ticker}
        </span>
        <span className="text-landing-outline">•</span>
        <span>{result.exchange}</span>
        <span className="text-landing-outline">•</span>
        <span className="truncate max-w-[120px] sm:max-w-none">{result.sector}</span>
        <span className="text-landing-outline">•</span>
        <span>{result.currency}</span>
      </div>

      {/* Investment Committee Synthesis Memo */}
      <div className="border-t border-landing-outline pt-4">
        <h4 className="font-newsreader text-base sm:text-lg font-semibold text-landing-primary mb-2">
          Executive Diligence Memo
        </h4>
        <div className="font-newsreader text-sm sm:text-base text-landing-text-secondary leading-relaxed whitespace-pre-line border-l-2 border-landing-secondary pl-3 sm:pl-4 py-1 italic">
          "{result.reasoningSummary}"
        </div>
      </div>
    </div>
  );
}
