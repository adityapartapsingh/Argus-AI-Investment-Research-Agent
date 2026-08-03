
import { ShieldCheck, LineChart, Network } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      title: '99.8% Data Veracity',
      description: 'Our proprietary ingestion engine cross-references multiple institutional feeds to ensure uncompromising accuracy before analysis begins.',
      icon: <ShieldCheck className="w-8 h-8 text-landing-secondary" />
    },
    {
      title: 'Real-time Predictive Modeling',
      description: 'Deploying quantitative models that adapt to market microstructure changes in milliseconds, providing actionable foresights.',
      icon: <LineChart className="w-8 h-8 text-landing-secondary" />
    },
    {
      title: 'Deep Market Correlation',
      description: 'Uncovering hidden alpha by analyzing multi-dimensional relationships across global asset classes and macroeconomic indicators.',
      icon: <Network className="w-8 h-8 text-landing-secondary" />
    }
  ];

  return (
    <section className="px-5 md:px-16 py-20 bg-landing-surface-dim border-y border-landing-outline/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-newsreader text-3xl md:text-4xl text-landing-primary font-medium mb-12 border-b border-landing-outline pb-4">
          Analytical Rigor
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white border border-landing-outline rounded p-8 shadow-[0_4px_12px_rgba(15,23,42,0.03)] hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition-shadow">
              <div className="mb-6">{feature.icon}</div>
              <h3 className="font-newsreader text-2xl text-landing-primary font-medium mb-4">{feature.title}</h3>
              <p className="font-sans text-landing-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
