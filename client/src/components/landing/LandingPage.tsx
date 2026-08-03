import { useState } from 'react';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import InteractiveCharts from './InteractiveCharts';
import PricingSection from './PricingSection';
import DemoModal from './DemoModal';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-landing-bg text-landing-text-primary font-sans antialiased overflow-x-hidden selection:bg-landing-secondary/30">
      
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-5 md:px-16 py-4 bg-white/90 backdrop-blur-md border-b border-landing-outline">
        <div className="font-newsreader text-2xl font-bold text-landing-primary tracking-tight">Argus</div>
        <div className="flex gap-4">
          <button 
            onClick={() => setIsDemoModalOpen(true)}
            className="hidden md:block text-sm font-semibold uppercase tracking-wider text-landing-tertiary hover:text-landing-primary transition-colors px-4 py-2"
          >
            Request Demo
          </button>
          <Link 
            to="/dashboard"
            className="text-sm font-semibold uppercase tracking-wider bg-landing-primary text-white hover:bg-landing-primary/90 transition-colors px-4 py-2 rounded"
          >
            Access Platform
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <HeroSection 
          onRequestDemo={() => setIsDemoModalOpen(true)} 
        />
        <FeaturesSection />
        <InteractiveCharts />
        <PricingSection />
      </main>

      {/* Footer */}
      <footer className="bg-landing-primary py-12 px-5 md:px-16 text-landing-surface-dim/60 text-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="font-newsreader text-2xl font-bold text-white tracking-tight mb-4 md:mb-0">Argus</div>
          <p>&copy; {new Date().getFullYear()} Argus Intelligence. All rights reserved.</p>
        </div>
      </footer>

      {/* Demo Modal */}
      <DemoModal 
        isOpen={isDemoModalOpen} 
        onClose={() => setIsDemoModalOpen(false)} 
      />
    </div>
  );
}
