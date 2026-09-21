import type { CompetitorData } from "../../types/research";
import { Users2, ArrowRight } from "lucide-react";

interface CompetitorTableProps {
  competitors: CompetitorData[];
  targetTicker: string;
  targetPE: number | null;
  targetGrowth: number | null;
  targetMargin: number | null;
  targetMarketCap: number | null;
}

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
    <div className="bg-white border border-landing-outline rounded p-4 sm:p-6 shadow-sm animate-slide-up">
      <div className="flex items-center justify-between mb-3 sm:mb-4 border-b border-landing-outline pb-3">
        <div className="flex items-center gap-2">
          <Users2 className="w-4 h-4 text-landing-secondary" />
          <h3 className="font-newsreader text-lg sm:text-xl font-semibold text-landing-primary tracking-tight">
            Peer Multiple Comparison
          </h3>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-mono text-landing-tertiary">
          <span className="sm:hidden flex items-center gap-0.5 text-landing-secondary font-semibold">
            Swipe <ArrowRight className="w-2.5 h-2.5" />
          </span>
          <span className="hidden sm:inline uppercase">Benchmarking</span>
        </div>
      </div>

      <div className="overflow-x-auto -mx-1 px-1">
        <table className="w-full text-xs min-w-[500px]">
          <thead>
            <tr className="border-b border-landing-outline text-landing-tertiary">
              <th className="text-left py-2 px-2.5 font-semibold uppercase tracking-wider text-[9px] sm:text-[10px]">
                Company
              </th>
              <th className="text-right py-2 px-2.5 font-semibold uppercase tracking-wider text-[9px] sm:text-[10px]">
                P/E Ratio
              </th>
              <th className="text-right py-2 px-2.5 font-semibold uppercase tracking-wider text-[9px] sm:text-[10px]">
                Market Cap
              </th>
              <th className="text-right py-2 px-2.5 font-semibold uppercase tracking-wider text-[9px] sm:text-[10px]">
                YoY Growth
              </th>
              <th className="text-right py-2 px-2.5 font-semibold uppercase tracking-wider text-[9px] sm:text-[10px]">
                Margin
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Target company row */}
            <tr className="bg-landing-surface-dim border-b border-landing-outline font-semibold">
              <td className="py-2.5 px-2.5 text-landing-primary">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold font-mono">{targetTicker}</span>
                  <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider bg-landing-primary text-white px-1.5 py-0.2 rounded">
                    Target
                  </span>
                </div>
              </td>
              <td className="text-right py-2.5 px-2.5 font-mono text-landing-primary">
                {targetPE?.toFixed(2) ?? "—"}
              </td>
              <td className="text-right py-2.5 px-2.5 font-mono text-landing-primary">
                {formatMarketCap(targetMarketCap)}
              </td>
              <td className="text-right py-2.5 px-2.5 font-mono text-landing-primary">
                {targetGrowth != null ? `${targetGrowth.toFixed(1)}%` : "—"}
              </td>
              <td className="text-right py-2.5 px-2.5 font-mono text-landing-primary">
                {targetMargin != null ? `${(targetMargin * 100).toFixed(1)}%` : "—"}
              </td>
            </tr>

            {/* Competitor rows */}
            {competitors.map((comp) => (
              <tr
                key={comp.ticker}
                className="border-b border-landing-outline/60 hover:bg-landing-surface-dim/70 transition-colors"
              >
                <td className="py-2 px-2.5">
                  <div className="font-medium text-landing-text-primary truncate max-w-[140px] sm:max-w-none">
                    {comp.name}
                  </div>
                  <div className="text-[9px] font-mono text-landing-tertiary">{comp.ticker}</div>
                </td>
                <td
                  className={`text-right py-2 px-2.5 font-mono font-medium ${
                    comp.peRatio != null && targetPE != null
                      ? comp.peRatio < targetPE
                        ? "text-accent-emerald"
                        : "text-accent-red"
                      : "text-landing-text-secondary"
                  }`}
                >
                  {comp.peRatio?.toFixed(2) ?? "—"}
                </td>
                <td className="text-right py-2 px-2.5 font-mono text-landing-text-secondary">
                  {formatMarketCap(comp.marketCap)}
                </td>
                <td
                  className={`text-right py-2 px-2.5 font-mono font-medium ${
                    comp.revenueGrowth != null && targetGrowth != null
                      ? comp.revenueGrowth > targetGrowth
                        ? "text-accent-emerald"
                        : "text-landing-tertiary"
                      : "text-landing-text-secondary"
                  }`}
                >
                  {comp.revenueGrowth != null ? `${comp.revenueGrowth.toFixed(1)}%` : "—"}
                </td>
                <td
                  className={`text-right py-2 px-2.5 font-mono font-medium ${
                    comp.margin != null && targetMargin != null
                      ? comp.margin > targetMargin
                        ? "text-accent-emerald"
                        : "text-landing-tertiary"
                      : "text-landing-text-secondary"
                  }`}
                >
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
