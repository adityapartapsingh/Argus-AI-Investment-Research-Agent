import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  LineChart, Line, Area, AreaChart,
} from "recharts";
import type { QuantitativeMetrics } from "../../types/research";

interface RevenueChartProps {
  metrics: QuantitativeMetrics;
  currency: string;
}

/**
 * Financial charts section:
 *  1. Revenue + Net Income bar chart (historical)
 *  2. Stock price trend line chart (1 year)
 */
export default function RevenueChart({ metrics, currency }: RevenueChartProps) {
  const symbol = currency === "INR" ? "₹" : currency === "GBP" ? "£" : "$";

  const formatValue = (value: number) => {
    if (Math.abs(value) >= 1e12) return `${symbol}${(value / 1e12).toFixed(1)}T`;
    if (Math.abs(value) >= 1e9) return `${symbol}${(value / 1e9).toFixed(1)}B`;
    if (Math.abs(value) >= 1e6) return `${symbol}${(value / 1e6).toFixed(0)}M`;
    if (Math.abs(value) >= 1e3) return `${symbol}${(value / 1e3).toFixed(0)}K`;
    return `${symbol}${value}`;
  };

  return (
    <div className="space-y-4 animate-slide-up">
      {/* Revenue & Net Income Bar Chart */}
      {metrics.revenueHistory.length > 0 && (
        <div className="bg-surface-raised border border-border-subtle rounded-2xl p-5">
          <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider mb-4">
            📈 Revenue & Net Income History
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={metrics.revenueHistory}
                margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2736" />
                <XAxis
                  dataKey="year"
                  stroke="#5A6B82"
                  fontSize={11}
                  fontFamily="JetBrains Mono"
                />
                <YAxis
                  stroke="#5A6B82"
                  fontSize={10}
                  fontFamily="JetBrains Mono"
                  tickFormatter={formatValue}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#151B26",
                    border: "1px solid #2A3545",
                    borderRadius: "12px",
                    fontSize: "12px",
                    fontFamily: "Inter",
                  }}
                  formatter={(value: number) => [formatValue(value), ""]}
                />
                <Legend
                  wrapperStyle={{ fontSize: "11px", fontFamily: "Inter" }}
                />
                <Bar
                  dataKey="revenue"
                  fill="#3B82F6"
                  name="Revenue"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="netIncome"
                  fill="#10B981"
                  name="Net Income"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Stock Price Trend */}
      {metrics.priceHistory.length > 0 && (
        <div className="bg-surface-raised border border-border-subtle rounded-2xl p-5">
          <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider mb-4">
            📉 Price Trend (1 Year)
          </h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={metrics.priceHistory}
                margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2736" />
                <XAxis
                  dataKey="date"
                  stroke="#5A6B82"
                  fontSize={9}
                  fontFamily="JetBrains Mono"
                  tickFormatter={(val) => val.slice(5)} // Show MM-DD
                  interval="preserveStartEnd"
                />
                <YAxis
                  stroke="#5A6B82"
                  fontSize={10}
                  fontFamily="JetBrains Mono"
                  tickFormatter={(val) => `${symbol}${val}`}
                  domain={["auto", "auto"]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#151B26",
                    border: "1px solid #2A3545",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) => [`${symbol}${value.toFixed(2)}`, "Price"]}
                />
                <Area
                  type="monotone"
                  dataKey="close"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  fill="url(#priceGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
