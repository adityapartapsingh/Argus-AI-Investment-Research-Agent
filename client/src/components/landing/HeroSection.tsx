import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="px-4 sm:px-8 md:px-16 pt-28 sm:pt-36 pb-16 sm:pb-24 flex flex-col items-center text-center">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-landing-surface-dim border border-landing-outline text-xs font-semibold text-landing-primary mb-6 shadow-xs">
        <Sparkles className="w-3.5 h-3.5 text-landing-secondary" />
        <span>Argus Intelligence v4.2 • Autonomous Research</span>
      </div>

      <h1 className="font-newsreader text-4xl sm:text-6xl md:text-7xl text-landing-primary font-semibold tracking-tight leading-[1.15] max-w-4xl">
        Argus Intelligence: <br />
        <span className="text-landing-tertiary font-medium">Precision Research for the Modern Investor</span>
      </h1>
      <p className="font-sans text-base sm:text-lg md:text-xl text-landing-text-secondary mt-5 sm:mt-6 max-w-2xl leading-relaxed">
        Empowering institutional-grade decisions with uncompromising data integrity, predictive analytics, and rigorous qualitative frameworks.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 sm:mt-10 w-full sm:w-auto justify-center">
        <Link 
          to="/dashboard"
          className="bg-landing-primary text-white font-semibold uppercase tracking-wider text-xs sm:text-sm px-8 py-4 rounded hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 shadow-md active:scale-[0.99]"
        >
          Access Platform <ArrowRight size={16} className="text-landing-secondary" />
        </Link>
      </div>
    </section>
  );
}
