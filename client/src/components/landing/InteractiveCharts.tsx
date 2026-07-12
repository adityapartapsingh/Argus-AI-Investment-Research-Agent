import { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';

const lineData = [
  { name: 'Jan', value: 18000 },
  { name: 'Feb', value: 18200 },
  { name: 'Mar', value: 18150 },
  { name: 'Apr', value: 18500 },
  { name: 'May', value: 18900 },
  { name: 'Jun', value: 19200 },
  { name: 'Jul', value: 19500 },
  { name: 'Aug', value: 19400 },
  { name: 'Sep', value: 19800 },
  { name: 'Oct', value: 20100 },
  { name: 'Nov', value: 20500 },
  { name: 'Dec', value: 21000 },
];

const barData = [
  { name: 'Finance', value: 35 },
  { name: 'IT', value: 25 },
  { name: 'Energy', value: 15 },
  { name: 'Healthcare', value: 10 },
  { name: 'Consumer', value: 15 },
];

export default function InteractiveCharts() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="px-5 md:px-16 py-24 bg-white border-y border-landing-outline/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-newsreader text-3xl md:text-4xl text-landing-primary font-medium mb-12 border-b border-landing-outline pb-4">
          Visual Analytics
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Nifty 50 Performance Chart */}
          <div className="bg-landing-surface-dim border border-landing-outline rounded p-6 shadow-sm">
            <h3 className="font-newsreader text-xl text-landing-primary font-medium mb-6">Nifty 50 Performance (YTD)</h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#475569', fontSize: 12, fontFamily: 'Inter' }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#475569', fontSize: 12, fontFamily: 'Inter' }} 
                    domain={['dataMin - 1000', 'dataMax + 1000']}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '4px', color: '#fff' }}
                    itemStyle={{ color: '#d4af37' }}
                    labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#0f172a" 
                    strokeWidth={2} 
                    dot={false}
                    activeDot={{ r: 6, fill: '#d4af37', stroke: '#fff', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sector Allocation Chart */}
          <div className="bg-landing-surface-dim border border-landing-outline rounded p-6 shadow-sm">
            <h3 className="font-newsreader text-xl text-landing-primary font-medium mb-6">Institutional Sector Allocation</h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                  onMouseMove={(state: any) => {
                    if (state.activeTooltipIndex !== undefined) {
                      setActiveIndex(state.activeTooltipIndex);
                    }
                  }}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#475569', fontSize: 12, fontFamily: 'Inter' }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#475569', fontSize: 12, fontFamily: 'Inter' }} 
                    tickFormatter={(val) => `${val}%`}
                  />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '4px', color: '#fff' }}
                    itemStyle={{ color: '#d4af37' }}
                    formatter={(value) => [`${value}%`, 'Allocation']}
                  />
                  <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                    {barData.map((_, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index === activeIndex ? '#d4af37' : '#0f172a'} 
                        className="transition-colors duration-300"
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
