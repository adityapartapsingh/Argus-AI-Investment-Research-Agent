import { useState } from 'react';
import { X } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dimmed Backdrop */}
      <div 
        className="absolute inset-0 bg-landing-primary/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden flex flex-col animate-slide-up">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-landing-tertiary hover:text-landing-primary transition-colors p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-landing-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-landing-secondary text-3xl">check</span>
              </div>
              <h3 className="font-newsreader text-2xl text-landing-primary font-medium mb-2">Request Received</h3>
              <p className="font-sans text-landing-text-secondary text-sm">
                Our institutional team will contact you shortly to schedule your demo.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="font-newsreader text-2xl text-landing-primary font-medium mb-2">Request a Demo</h2>
                <p className="font-sans text-landing-text-secondary text-sm">
                  Experience precision research for your institution.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block font-sans text-xs font-semibold uppercase tracking-wider text-landing-primary mb-1">
                    Name
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    required
                    className="w-full bg-landing-surface-dim border border-landing-outline rounded px-4 py-2 text-landing-text-primary focus:outline-none focus:border-landing-secondary focus:ring-1 focus:ring-landing-secondary transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-sans text-xs font-semibold uppercase tracking-wider text-landing-primary mb-1">
                    Corporate Email
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    required
                    className="w-full bg-landing-surface-dim border border-landing-outline rounded px-4 py-2 text-landing-text-primary focus:outline-none focus:border-landing-secondary focus:ring-1 focus:ring-landing-secondary transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="firm" className="block font-sans text-xs font-semibold uppercase tracking-wider text-landing-primary mb-1">
                    Institution / Firm Name
                  </label>
                  <input 
                    type="text" 
                    id="firm" 
                    required
                    className="w-full bg-landing-surface-dim border border-landing-outline rounded px-4 py-2 text-landing-text-primary focus:outline-none focus:border-landing-secondary focus:ring-1 focus:ring-landing-secondary transition-all"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full mt-4 bg-landing-secondary text-landing-primary font-semibold uppercase tracking-wider text-sm py-3 rounded hover:bg-landing-secondary/90 transition-colors shadow-md"
                >
                  Submit Request
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
