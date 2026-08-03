import type { QuantitativeMetrics } from "../../types/research";

interface QuantMetricsProps {
  metrics: QuantitativeMetrics;
  currency: string;
}

/**
 * Grid of financial KPI cards showing key metrics.
 */
export default function QuantMetrics({ metrics, currency }: QuantMetricsProps) {
  const cards = [
    {
      label: "P/E Ratio",
      value: metrics.peRatio?.toFixed(2) ?? "N/A",
      description: "Price-to-Earnings",
      good: metrics.peRatio != null && metrics.peRatio < 25,
    },
    {
      label: "P/B Ratio",
      value: metrics.pbRatio?.toFixed(2) ?? "N/A",
      description: "Price-to-Book",
      good: metrics.pbRatio != null && metrics.pbRatio < 3,
    },
    {
      label: "Debt/Equity",
      value: metrics.debtToEquity?.toFixed(2) ?? "N/A",
      description: "Leverage Ratio",
      good: metrics.debtToEquity != null && metrics.debtToEquity < 1,
    },
    {
      label: "ROE",
      value: metrics.returnOnEquity != null ? `${(metrics.returnOnEquity * 100).toFixed(1)}%` : "N/A",
      description: "Return on Equity",
      good: metrics.returnOnEquity != null && metrics.returnOnEquity > 0.15,
    },
    {
      label: "Revenue Growth",
      value: metrics.revenueGrowthYoY != null ? `${metrics.revenueGrowthYoY.toFixed(1)}%` : "N/A",
      description: "Year-over-Year",
      good: metrics.revenueGrowthYoY != null && metrics.revenueGrowthYoY > 5,
    },
    {
      label: "Free Cash Flow",
      value: metrics.freeCashFlow != null ? formatNum(metrics.freeCashFlow, currency) : "N/A",
      description: "Available Cash",
      good: metrics.freeCashFlow != null && metrics.freeCashFlow > 0,
    },
    {
      label: "Operating Margin",
      value: metrics.operatingMargin != null ? `${(metrics.operatingMargin * 100).toFixed(1)}%` : "N/A",
      description: "Profitability",
      good: metrics.operatingMargin != null && metrics.operatingMargin > 0.1,
    },
    {
      label: "Market Cap",
      value: metrics.marketCap != null ? formatNum(metrics.marketCap, currency) : "N/A",
      description: "Total Valuation",
      good: null, // neutral — size isn't inherently good/bad
    },
  ];

  return (
    <div className="bg-surface-raised border border-border-subtle rounded-2xl p-5 animate-slide-up">
      <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider mb-4">
        📊 Key Financial Metrics
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-surface-base border border-border-subtle rounded-xl p-3 card-hover"
          >
            <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-1">
              {card.label}
            </p>
            <p className={`text-lg font-black ${
              card.good === true ? "text-accent-emerald" :
              card.good === false ? "text-accent-red" :
              "text-text-primary"
            }`}>
              {card.value}
            </p>
            <p className="text-[9px] text-text-muted mt-0.5">{card.description}</p>
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
