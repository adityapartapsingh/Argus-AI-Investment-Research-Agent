import type { QuantitativeMetrics } from "../../types/research";
import { BarChart2 } from "lucide-react";

interface QuantMetricsProps {
  metrics: QuantitativeMetrics;
  currency: string;
}

export default function QuantMetrics({ metrics, currency }: QuantMetricsProps) {
  const cards = [
    {
      label: "P/E Ratio",
      value: metrics.peRatio?.toFixed(2) ?? "N/A",
      description: "Price-to-Earnings",
      good: metrics.peRatio != null && metrics.peRatio < 25,
      benchmark: "Historical: 24.0x",
    },
    {
      label: "P/B Ratio",
      value: metrics.pbRatio?.toFixed(2) ?? "N/A",
      description: "Price-to-Book",
      good: metrics.pbRatio != null && metrics.pbRatio < 3,
      benchmark: "Sector: 3.5x",
    },
    {
      label: "Debt / Equity",
      value: metrics.debtToEquity?.toFixed(2) ?? "N/A",
      description: "Leverage Ratio",
      good: metrics.debtToEquity != null && metrics.debtToEquity < 1,
      benchmark: "Prudent: < 1.0x",
    },
    {
      label: "ROE",
      value: metrics.returnOnEquity != null ? `${(metrics.returnOnEquity * 100).toFixed(1)}%` : "N/A",
      description: "Return on Equity",
      good: metrics.returnOnEquity != null && metrics.returnOnEquity > 0.15,
      benchmark: "Cost of Cap: 12%",
    },
    {
      label: "YoY Growth",
      value: metrics.revenueGrowthYoY != null ? `${metrics.revenueGrowthYoY.toFixed(1)}%` : "N/A",
      description: "Revenue Growth",
      good: metrics.revenueGrowthYoY != null && metrics.revenueGrowthYoY > 5,
      benchmark: "GDP+: 6.5%",
    },
    {
      label: "Free Cash Flow",
      value: metrics.freeCashFlow != null ? formatNum(metrics.freeCashFlow, currency) : "N/A",
      description: "Organic Cash",
      good: metrics.freeCashFlow != null && metrics.freeCashFlow > 0,
      benchmark: "FCF Yield Positive",
    },
    {
      label: "Operating Margin",
      value: metrics.operatingMargin != null ? `${(metrics.operatingMargin * 100).toFixed(1)}%` : "N/A",
      description: "EBIT Conversion",
      good: metrics.operatingMargin != null && metrics.operatingMargin > 0.1,
      benchmark: "Industry: 15%",
    },
    {
      label: "Market Cap",
      value: metrics.marketCap != null ? formatNum(metrics.marketCap, currency) : "N/A",
      description: "Equity Value",
      good: null,
      benchmark: "Enterprise Scale",
    },
  ];

  return (
    <div className="bg-white border border-landing-outline rounded p-4 sm:p-6 shadow-sm animate-slide-up">
      <div className="flex items-center justify-between mb-4 sm:mb-5 border-b border-landing-outline pb-3">
        <div className="flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-landing-secondary" />
          <h3 className="font-newsreader text-lg sm:text-xl font-semibold text-landing-primary tracking-tight">
            Fundamental Health Ratios
          </h3>
        </div>
        <span className="text-[9px] sm:text-[10px] font-mono text-landing-tertiary uppercase tracking-wider">
          Audited Telemetry
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-landing-surface-dim border border-landing-outline rounded p-3 sm:p-3.5 card-hover flex flex-col justify-between"
          >
            <div>
              <p className="text-[9px] sm:text-[10px] font-bold text-landing-tertiary uppercase tracking-wider mb-1 truncate">
                {card.label}
              </p>
              <p
                className={`text-base sm:text-xl font-bold font-mono tracking-tight truncate ${
                  card.good === true
                    ? "text-accent-emerald"
                    : card.good === false
                    ? "text-accent-red"
                    : "text-landing-primary"
                }`}
              >
                {card.value}
              </p>
            </div>
            <div className="mt-2.5 pt-1.5 border-t border-landing-outline/60 flex items-center justify-between text-[9px] sm:text-[10px] text-landing-tertiary">
              <span className="truncate">{card.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatNum(value: number, currency: string): string {
  const symbol = currency === "INR" ? "₹" : currency === "GBP" ? "£" : "$";
  if (Math.abs(value) >= 1e12) return `${symbol}${(value / 1e12).toFixed(2)}T`;
  if (Math.abs(value) >= 1e9) return `${symbol}${(value / 1e9).toFixed(2)}B`;
  if (Math.abs(value) >= 1e6) return `${symbol}${(value / 1e6).toFixed(1)}M`;
  return `${symbol}${value.toLocaleString()}`;
}
