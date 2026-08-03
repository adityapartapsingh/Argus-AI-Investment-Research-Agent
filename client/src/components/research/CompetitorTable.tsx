import type { CompetitorData } from "../../types/research";

interface CompetitorTableProps {
  competitors: CompetitorData[];
  targetTicker: string;
  targetPE: number | null;
  targetGrowth: number | null;
  targetMargin: number | null;
  targetMarketCap: number | null;
}

/**
 * Peer comparison table showing how the target company stacks up
 * against its closest competitors.
 */
export default function CompetitorTable({
  competitors,
  targetTicker,
  targetPE,
  targetGrowth,
  targetMargin,
  targetMarketCap,
}: CompetitorTableProps) {
  if (competitors.length === 0) return null;

  return (
    <div className="bg-surface-raised border border-border-subtle rounded-2xl p-5 animate-slide-up">
      <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider mb-4">
        🏢 Competitor Benchmark
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border-subtle">
              <th className="text-left py-2 px-3 text-text-muted font-semibold uppercase tracking-wider text-[10px]">Company</th>
              <th className="text-right py-2 px-3 text-text-muted font-semibold uppercase tracking-wider text-[10px]">P/E Ratio</th>
              <th className="text-right py-2 px-3 text-text-muted font-semibold uppercase tracking-wider text-[10px]">Market Cap</th>
              <th className="text-right py-2 px-3 text-text-muted font-semibold uppercase tracking-wider text-[10px]">Revenue Growth</th>
              <th className="text-right py-2 px-3 text-text-muted font-semibold uppercase tracking-wider text-[10px]">Margin</th>
            </tr>
          </thead>
          <tbody>
            {/* Target company row (highlighted) */}
            <tr className="bg-accent-blue/5 border-b border-border-subtle">
              <td className="py-2.5 px-3 font-bold text-accent-blue">
                {targetTicker} <span className="text-[9px] text-text-muted">(Target)</span>
              </td>
              <td className="text-right py-2.5 px-3 font-mono font-semibold text-text-primary">
                {targetPE?.toFixed(2) ?? "—"}
              </td>
              <td className="text-right py-2.5 px-3 font-mono font-semibold text-text-primary">
                {formatMarketCap(targetMarketCap)}
              </td>
              <td className="text-right py-2.5 px-3 font-mono font-semibold text-text-primary">
                {targetGrowth != null ? `${targetGrowth.toFixed(1)}%` : "—"}
              </td>
              <td className="text-right py-2.5 px-3 font-mono font-semibold text-text-primary">
                {targetMargin != null ? `${(targetMargin * 100).toFixed(1)}%` : "—"}
              </td>
            </tr>

            {/* Competitor rows */}
            {competitors.map((comp) => (
              <tr key={comp.ticker} className="border-b border-border-subtle/50 hover:bg-surface-overlay/50 transition-colors">
                <td className="py-2.5 px-3">
                  <div className="font-semibold text-text-primary">{comp.name}</div>
                  <div className="text-[9px] font-mono text-text-muted">{comp.ticker}</div>
                </td>
                <td className={`text-right py-2.5 px-3 font-mono font-semibold ${
                  comp.peRatio != null && targetPE != null
                    ? comp.peRatio < targetPE ? "text-accent-emerald" : "text-accent-red"
                    : "text-text-secondary"
                }`}>
                  {comp.peRatio?.toFixed(2) ?? "—"}
                </td>
                <td className="text-right py-2.5 px-3 font-mono font-semibold text-text-secondary">
                  {formatMarketCap(comp.marketCap)}
                </td>
                <td className={`text-right py-2.5 px-3 font-mono font-semibold ${
                  comp.revenueGrowth != null && targetGrowth != null
                    ? comp.revenueGrowth > targetGrowth ? "text-accent-red" : "text-accent-emerald"
                    : "text-text-secondary"
                }`}>
                  {comp.revenueGrowth != null ? `${comp.revenueGrowth.toFixed(1)}%` : "—"}
                </td>
                <td className={`text-right py-2.5 px-3 font-mono font-semibold ${
                  comp.margin != null && targetMargin != null
                    ? comp.margin > targetMargin ? "text-accent-red" : "text-accent-emerald"
                    : "text-text-secondary"
                }`}>
                  {comp.margin != null ? `${(comp.margin * 100).toFixed(1)}%` : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function formatMarketCap(value: number | null): string {
  if (value == null) return "—";
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(0)}M`;
  return `$${value.toLocaleString()}`;
}
