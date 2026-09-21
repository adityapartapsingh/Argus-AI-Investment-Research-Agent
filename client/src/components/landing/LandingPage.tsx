import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import InteractiveCharts from './InteractiveCharts';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-landing-bg text-landing-text-primary font-sans antialiased overflow-x-hidden selection:bg-landing-secondary/30">
      
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-4 sm:px-8 md:px-16 py-3.5 sm:py-4 bg-white/95 backdrop-blur-md border-b border-landing-outline shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-landing-primary text-landing-secondary flex items-center justify-center font-newsreader font-bold text-lg shadow-sm">
            A
          </div>
          <div className="font-newsreader text-xl sm:text-2xl font-bold text-landing-primary tracking-tight">
            Argus
          </div>
        </Link>
        
        <div className="flex items-center gap-3">
          <Link 
            to="/dashboard"
            className="text-xs sm:text-sm font-semibold uppercase tracking-wider bg-landing-primary text-white hover:bg-landing-primary/90 transition-all px-4 sm:px-5 py-2.5 rounded shadow-sm flex items-center gap-1.5 active:scale-[0.99]"
          >
            <BarChart3 className="w-3.5 h-3.5 text-landing-secondary hidden xs:inline" />
            <span>Access Platform</span>
            <ArrowRight size={14} className="text-landing-secondary hidden sm:inline" />
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <HeroSection />
        <FeaturesSection />
        <InteractiveCharts />
      </main>

      {/* Footer */}
      <footer className="bg-landing-primary py-10 px-4 sm:px-8 md:px-16 text-landing-surface-dim/70 text-xs sm:text-sm border-t border-landing-primary">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-white/10 text-landing-secondary flex items-center justify-center font-newsreader font-bold text-sm">
              A
            </div>
            <div className="font-newsreader text-xl font-bold text-white tracking-tight">Argus</div>
          </div>
          <p>&copy; {new Date().getFullYear()} Argus Intelligence. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
