import { AlertTriangle, Lightbulb } from "lucide-react";
import type { QualitativeMetrics } from "../../types/research";

interface RiskSummaryProps {
  metrics: QualitativeMetrics;
}

/**
 * Qualitative risk summary panel showing:
 *  - Overall sentiment badge
 *  - Key themes
 *  - Risk factors
 *  - Positive catalysts
 */
export default function RiskSummary({ metrics }: RiskSummaryProps) {
  const sentimentColor = {
    BULLISH: "text-accent-emerald bg-accent-emerald/10 border-accent-emerald/20",
    BEARISH: "text-accent-red bg-accent-red/10 border-accent-red/20",
    NEUTRAL: "text-accent-amber bg-accent-amber/10 border-accent-amber/20",
  };

  return (
    <div className="space-y-4 animate-slide-up">
      {/* Sentiment Badge */}
      <div className="bg-surface-raised border border-border-subtle rounded-2xl p-5">
        <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider mb-3">
          📡 Market Sentiment
        </h3>
        <div className="flex items-center gap-3 mb-3">
          <span className={`badge text-sm px-4 py-1 border ${sentimentColor[metrics.sentiment]}`}>
            {metrics.sentiment}
          </span>
          <span className="text-xs text-text-muted font-mono">
            Score: {metrics.sentimentScore}/100 • Confidence: {(metrics.sentimentConfidence * 100).toFixed(0)}%
          </span>
        </div>
        {/* Themes */}
        {metrics.themes.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {metrics.themes.map((theme, i) => (
              <span key={i} className="text-[10px] font-semibold text-text-secondary bg-surface-base border border-border-subtle rounded-lg px-2.5 py-1">
                {theme}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Risk Factors */}
      {metrics.riskFactors.length > 0 && (
        <div className="bg-surface-raised border border-border-subtle rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-3.5 h-3.5 text-accent-amber" />
            <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider">Risk Factors</h3>
          </div>
          <ul className="space-y-2">
            {metrics.riskFactors.map((risk, i) => (
              <li key={i} className="text-xs text-text-secondary bg-surface-base border border-border-subtle rounded-xl p-3 leading-relaxed">
                <span className="text-accent-amber mr-1.5">⚠</span>
                {risk}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Catalysts */}
      {metrics.catalysts.length > 0 && (
        <div className="bg-surface-raised border border-border-subtle rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-3.5 h-3.5 text-accent-emerald" />
            <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider">Positive Catalysts</h3>
          </div>
          <ul className="space-y-2">
            {metrics.catalysts.map((catalyst, i) => (
              <li key={i} className="text-xs text-text-secondary bg-surface-base border border-border-subtle rounded-xl p-3 leading-relaxed">
                <span className="text-accent-emerald mr-1.5">✦</span>
                {catalyst}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
