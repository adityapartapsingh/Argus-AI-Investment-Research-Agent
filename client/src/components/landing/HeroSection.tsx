
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroSection({ onRequestDemo }: { onRequestDemo: () => void }) {
  return (
    <section className="px-5 md:px-16 pt-32 pb-20 flex flex-col items-center text-center">
      <h1 className="font-newsreader text-5xl md:text-7xl text-landing-primary font-semibold tracking-tight leading-tight max-w-4xl">
        Argus Intelligence: <br />
        <span className="text-landing-tertiary font-medium">Precision Research for the Modern Investor</span>
      </h1>
      <p className="font-sans text-lg md:text-xl text-landing-text-secondary mt-6 max-w-2xl leading-relaxed">
        Empowering institutional-grade decisions with uncompromising data integrity, predictive analytics, and rigorous qualitative frameworks.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 mt-10">
        <Link 
          to="/dashboard"
          className="bg-landing-primary text-white font-semibold uppercase tracking-wider text-sm px-8 py-4 rounded hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
        >
          Access Platform <ArrowRight size={16} />
        </Link>
        <button 
          onClick={onRequestDemo}
          className="bg-transparent border border-landing-outline text-landing-primary font-semibold uppercase tracking-wider text-sm px-8 py-4 rounded hover:bg-landing-surface-dim transition-colors"
        >
          Request Demo
        </button>
      </div>
    </section>
  );
}
