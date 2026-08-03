
import { Check } from 'lucide-react';

export default function PricingSection() {
  const tiers = [
    {
      name: 'Analyst',
      description: 'Essential research tools for individual professionals.',
      price: '$149',
      features: ['Real-time market data', 'Basic predictive models', 'Daily market pulse', 'Exportable charts']
    },
    {
      name: 'Fund Manager',
      description: 'Advanced analytics for portfolio management teams.',
      price: '$499',
      features: ['Everything in Analyst', 'Deep market correlation', 'Proprietary risk modeling', 'API Access (10k calls/mo)', 'Priority support'],
      highlighted: true
    },
    {
      name: 'Enterprise',
      description: 'Bespoke integration for large institutional clients.',
      price: 'Custom',
      features: ['Unlimited API Access', 'Custom model training', 'Dedicated account manager', 'On-premise deployment options', 'SLA guarantees']
    }
  ];

  return (
    <section className="px-5 md:px-16 py-24 bg-landing-bg">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-newsreader text-3xl md:text-4xl text-landing-primary font-medium mb-4">
            Professional Access
          </h2>
          <p className="font-sans text-landing-text-secondary max-w-2xl mx-auto">
            Institutional-grade pricing tailored for varying levels of research intensity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, idx) => (
            <div 
              key={idx} 
              className={`bg-white border rounded-lg p-8 flex flex-col ${
                tier.highlighted 
                  ? 'border-landing-secondary shadow-[0_8px_30px_rgba(212,175,55,0.15)] relative transform md:-translate-y-2' 
                  : 'border-landing-outline shadow-sm'
              }`}
            >
              {tier.highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-landing-secondary text-white font-sans text-xs font-bold uppercase tracking-widest py-1 px-3 rounded-full">
                  Most Popular
                </div>
              )}
              
              <h3 className="font-newsreader text-2xl text-landing-primary font-medium mb-2">{tier.name}</h3>
              <p className="font-sans text-landing-text-secondary text-sm mb-6 h-10">{tier.description}</p>
              
              <div className="mb-8">
                <span className="font-sans text-4xl font-bold text-landing-primary">{tier.price}</span>
                {tier.price !== 'Custom' && <span className="text-landing-text-secondary text-sm">/mo</span>}
              </div>
              
              <ul className="flex-1 space-y-4 mb-8">
                {tier.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3 text-sm text-landing-text-primary">
                    <Check className="w-5 h-5 text-landing-secondary shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-3 rounded font-sans font-semibold uppercase tracking-wider text-sm transition-colors ${
                tier.highlighted 
                  ? 'bg-landing-primary text-white hover:bg-landing-primary/90' 
                  : 'bg-transparent border border-landing-outline text-landing-primary hover:bg-landing-surface-dim'
              }`}>
                {tier.price === 'Custom' ? 'Contact Sales' : 'Start Trial'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
