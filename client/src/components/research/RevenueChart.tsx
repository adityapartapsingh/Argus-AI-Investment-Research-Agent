import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart,
} from "recharts";
import type { QuantitativeMetrics } from "../../types/research";
import { LineChart as LineChartIcon, BarChart3, TrendingUp } from "lucide-react";

interface RevenueChartProps {
  metrics: QuantitativeMetrics;
  currency: string;
}

export default function RevenueChart({ metrics, currency }: RevenueChartProps) {
  const [activeTab, setActiveTab] = useState<"FINANCIALS" | "PRICE">("FINANCIALS");
  const symbol = currency === "INR" ? "₹" : currency === "GBP" ? "£" : "$";

  const formatValue = (value: number) => {
    if (Math.abs(value) >= 1e12) return `${symbol}${(value / 1e12).toFixed(1)}T`;
    if (Math.abs(value) >= 1e9) return `${symbol}${(value / 1e9).toFixed(1)}B`;
    if (Math.abs(value) >= 1e6) return `${symbol}${(value / 1e6).toFixed(0)}M`;
    if (Math.abs(value) >= 1e3) return `${symbol}${(value / 1e3).toFixed(0)}K`;
    return `${symbol}${value}`;
  };

  const hasFinancials = metrics.revenueHistory && metrics.revenueHistory.length > 0;
  const hasPrice = metrics.priceHistory && metrics.priceHistory.length > 0;

  return (
    <div className="bg-white border border-landing-outline rounded p-4 sm:p-6 shadow-sm animate-slide-up">
      {/* Chart Section Header with View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6 border-b border-landing-outline pb-3 sm:pb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-landing-secondary" />
          <h3 className="font-newsreader text-lg sm:text-xl font-semibold text-landing-primary tracking-tight">
            Visual Financial Analytics
          </h3>
        </div>

        {/* Tab Controls (Full Width on Mobile) */}
        <div className="flex items-center gap-1 bg-landing-surface-dim p-1 rounded border border-landing-outline text-xs w-full sm:w-auto">
          {hasFinancials && (
            <button
              onClick={() => setActiveTab("FINANCIALS")}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "FINANCIALS"
                  ? "bg-landing-primary text-white shadow-xs"
                  : "text-landing-tertiary hover:text-landing-primary"
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              Annual Ratios
            </button>
          )}

          {hasPrice && (
            <button
              onClick={() => setActiveTab("PRICE")}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "PRICE"
                  ? "bg-landing-primary text-white shadow-xs"
                  : "text-landing-tertiary hover:text-landing-primary"
              }`}
            >
              <LineChartIcon className="w-3.5 h-3.5" />
              1Y Price Trend
            </button>
          )}
        </div>
      </div>

      {/* Chart 1: Revenue & Net Income Bar Chart */}
      {activeTab === "FINANCIALS" && hasFinancials && (
        <div>
          <div className="flex items-center justify-between text-[11px] sm:text-xs text-landing-tertiary mb-3 font-mono">
            <span>Historical Gross Revenue vs. Net Income</span>
            <span className="text-landing-secondary font-semibold hidden xs:inline">Audited Filings</span>
          </div>

          <div className="h-56 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={metrics.revenueHistory}
                margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis
                  dataKey="year"
                  stroke="#475569"
                  fontSize={11}
                  fontFamily="Inter"
                  tickLine={false}
                  axisLine={false}
                  dy={6}
                />
                <YAxis
                  stroke="#475569"
                  fontSize={10}
                  fontFamily="JetBrains Mono"
                  tickFormatter={formatValue}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "none",
                    borderRadius: "6px",
                    color: "#ffffff",
                    fontSize: "12px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                  }}
                  itemStyle={{ color: "#d4af37" }}
                  formatter={(value: any) => [formatValue(Number(value)), ""]}
                />
                <Legend
                  wrapperStyle={{ fontSize: "11px", fontFamily: "Inter", paddingTop: "8px" }}
                />
                <Bar
                  dataKey="revenue"
                  fill="#0f172a"
                  name="Gross Revenue"
                  radius={[3, 3, 0, 0]}
                />
                <Bar
                  dataKey="netIncome"
                  fill="#d4af37"
                  name="Net Income"
                  radius={[3, 3, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Chart 2: 1-Year Stock Price Trend Area Chart */}
      {activeTab === "PRICE" && hasPrice && (
        <div>
          <div className="flex items-center justify-between text-[11px] sm:text-xs text-landing-tertiary mb-3 font-mono">
            <span>Daily Closing Prices (Past 252 Days)</span>
            <span className="text-accent-emerald font-semibold hidden xs:inline">1Y Trajectory</span>
          </div>

          <div className="h-56 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={metrics.priceHistory}
                margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0f172a" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#d4af37" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis
                  dataKey="date"
                  stroke="#475569"
                  fontSize={10}
                  fontFamily="JetBrains Mono"
                  tickFormatter={(val) => val.slice(5)}
                  tickLine={false}
                  axisLine={false}
                  interval="preserveStartEnd"
                  dy={6}
                />
                <YAxis
                  stroke="#475569"
                  fontSize={10}
                  fontFamily="JetBrains Mono"
                  tickFormatter={(val) => `${symbol}${val}`}
                  domain={["auto", "auto"]}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "none",
                    borderRadius: "6px",
                    color: "#ffffff",
                    fontSize: "12px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                  }}
                  itemStyle={{ color: "#d4af37" }}
                  formatter={(value: any) => [`${symbol}${Number(value).toFixed(2)}`, "Close"]}
                />
                <Area
                  type="monotone"
                  dataKey="close"
                  stroke="#0f172a"
                  strokeWidth={2}
                  fill="url(#priceGradient)"
                  activeDot={{ r: 4, fill: "#d4af37", stroke: "#0f172a", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {!hasFinancials && !hasPrice && (
        <div className="py-10 text-center text-xs text-landing-tertiary">
          Historical chart telemetry not available for this ticker.
        </div>
      )}
    </div>
  );
}
