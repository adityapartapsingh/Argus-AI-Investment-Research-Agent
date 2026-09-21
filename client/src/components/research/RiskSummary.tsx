import { AlertTriangle, Lightbulb, Radio } from "lucide-react";
import type { QualitativeMetrics } from "../../types/research";

interface RiskSummaryProps {
  metrics: QualitativeMetrics;
}

export default function RiskSummary({ metrics }: RiskSummaryProps) {
  const sentimentStyles = {
    BULLISH: "text-accent-emerald bg-accent-emerald/10 border-accent-emerald/30",
    BEARISH: "text-accent-red bg-accent-red/10 border-accent-red/30",
    NEUTRAL: "text-amber-700 bg-amber-50 border-amber-200",
  };

  return (
    <div className="space-y-4 animate-slide-up">
      {/* 1. Market Sentiment Card */}
      <div className="bg-white border border-landing-outline rounded p-4 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-3 border-b border-landing-outline pb-3">
          <Radio className="w-4 h-4 text-landing-secondary" />
          <h3 className="font-newsreader text-lg sm:text-xl font-semibold text-landing-primary tracking-tight">
            Market Sentiment
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 mb-3">
          <span
            className={`badge text-xs px-3 py-1 font-bold border ${
              sentimentStyles[metrics.sentiment]
            }`}
          >
            {metrics.sentiment}
          </span>
          <span className="text-xs text-landing-tertiary font-mono">
            Score: <strong className="text-landing-primary">{metrics.sentimentScore}/100</strong> • {(metrics.sentimentConfidence * 100).toFixed(0)}% Conf.
          </span>
        </div>

        {/* Thematic Tags */}
        {metrics.themes.length > 0 && (
          <div>
            <p className="text-[10px] font-bold text-landing-tertiary uppercase tracking-wider mb-1.5">
              Strategic Themes
            </p>
            <div className="flex flex-wrap gap-1.5">
              {metrics.themes.map((theme, i) => (
                <span
                  key={i}
                  className="text-[10px] sm:text-[11px] font-medium text-landing-primary bg-landing-surface-dim border border-landing-outline rounded px-2.5 py-1"
                >
                  {theme}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 2. Positive Catalysts */}
      {metrics.catalysts.length > 0 && (
        <div className="bg-white border border-landing-outline rounded p-4 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3 border-b border-landing-outline pb-3">
            <Lightbulb className="w-4 h-4 text-accent-emerald" />
            <h3 className="font-newsreader text-lg sm:text-xl font-semibold text-landing-primary tracking-tight">
              Growth Catalysts
            </h3>
          </div>
          <ul className="space-y-2">
            {metrics.catalysts.map((catalyst, i) => (
              <li
                key={i}
                className="text-xs text-landing-text-secondary bg-landing-surface-dim/60 border border-landing-outline rounded p-2.5 sm:p-3 leading-relaxed flex items-start gap-2"
              >
                <span className="text-accent-emerald font-bold text-sm leading-none mt-0.5">✦</span>
                <span>{catalyst}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 3. Downside Risk Factors */}
      {metrics.riskFactors.length > 0 && (
        <div className="bg-white border border-landing-outline rounded p-4 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3 border-b border-landing-outline pb-3">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <h3 className="font-newsreader text-lg sm:text-xl font-semibold text-landing-primary tracking-tight">
              Risk Vulnerabilities
            </h3>
          </div>
          <ul className="space-y-2">
            {metrics.riskFactors.map((risk, i) => (
              <li
                key={i}
                className="text-xs text-landing-text-secondary bg-amber-50/40 border border-amber-200/60 rounded p-2.5 sm:p-3 leading-relaxed flex items-start gap-2"
              >
                <span className="text-amber-600 font-bold text-sm leading-none mt-0.5">⚠</span>
                <span>{risk}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
