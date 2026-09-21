import { motion } from "framer-motion";
import { Search, BrainCircuit, Activity, BarChart3, ShieldCheck, Sparkles } from "lucide-react";

export default function AnalyzingAnimation() {
  return (
    <div className="bg-white border border-landing-outline rounded p-6 sm:p-12 shadow-sm my-4 flex flex-col items-center justify-center animate-fade-in overflow-hidden">
      <div className="relative w-40 h-40 sm:w-52 sm:h-52 flex items-center justify-center">
        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-landing-secondary/10 blur-2xl sm:blur-3xl rounded-full animate-pulse" />
        
        {/* Outer dashed spinning ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-dashed border-landing-primary/25"
        />
        
        {/* Middle reverse spinning ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-3 sm:inset-4 rounded-full border border-landing-secondary/40"
        />

        {/* Inner pulsing radar ring */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-6 sm:inset-8 rounded-full border border-landing-primary/20 bg-landing-surface-dim/40"
        />

        {/* Floating Telemetry Badges (Mobile Responsive Positioning) */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 bg-white p-1.5 sm:p-2.5 rounded border border-landing-outline shadow-md flex items-center gap-1"
        >
          <Search className="w-3.5 h-3.5 text-landing-primary" />
          <span className="text-[9px] sm:text-[10px] font-mono font-semibold text-landing-primary">Yahoo</span>
        </motion.div>

        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 bg-white p-1.5 sm:p-2.5 rounded border border-landing-outline shadow-md flex items-center gap-1"
        >
          <BarChart3 className="w-3.5 h-3.5 text-accent-emerald" />
          <span className="text-[9px] sm:text-[10px] font-mono font-semibold text-landing-primary">Quant</span>
        </motion.div>

        <motion.div
          animate={{ x: [0, 6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          className="absolute top-1/2 -right-4 sm:-right-8 -translate-y-1/2 bg-white p-1.5 sm:p-2.5 rounded border border-landing-outline shadow-md flex items-center gap-1"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-landing-secondary" />
          <span className="text-[9px] sm:text-[10px] font-mono font-semibold text-landing-primary">Audit</span>
        </motion.div>

        {/* Center Institutional Core */}
        <div className="relative bg-landing-primary p-5 sm:p-7 rounded-full shadow-[0_8px_25px_rgba(15,23,42,0.25)] border-2 border-landing-secondary/40">
          <BrainCircuit className="w-9 h-9 sm:w-12 sm:h-12 text-landing-secondary animate-pulse" />
        </div>
      </div>

      {/* Synthesis Status Callout */}
      <div className="mt-8 sm:mt-10 text-center space-y-2 max-w-md">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-landing-surface-dim border border-landing-outline text-[11px] font-semibold text-landing-primary">
          <Activity className="w-3 h-3 text-accent-emerald animate-pulse" />
          <span>Active Agent Workflow</span>
        </div>

        <h3 className="font-newsreader text-xl sm:text-2xl font-semibold text-landing-primary tracking-tight">
          Synthesizing Research Memo
        </h3>
        
        <p className="text-xs text-landing-tertiary leading-relaxed px-2">
          Extracting audited financials, mapping peer multiples, calculating solvency ratios, and executing single-shot Gemini synthesis.
        </p>

        {/* Step Progress Checklist */}
        <div className="pt-3 grid grid-cols-3 gap-1.5 sm:gap-2 text-left">
          <div className="p-2 sm:p-2.5 bg-landing-surface-dim rounded border border-landing-outline">
            <p className="text-[8px] sm:text-[9px] font-mono text-landing-tertiary uppercase">Phase 1</p>
            <p className="text-[10px] sm:text-[11px] font-semibold text-landing-primary mt-0.5 truncate">Intake</p>
          </div>
          <div className="p-2 sm:p-2.5 bg-landing-surface-dim rounded border border-landing-outline">
            <p className="text-[8px] sm:text-[9px] font-mono text-landing-tertiary uppercase">Phase 2</p>
            <p className="text-[10px] sm:text-[11px] font-semibold text-landing-primary mt-0.5 truncate">Quant Data</p>
          </div>
          <div className="p-2 sm:p-2.5 bg-landing-secondary/10 rounded border border-landing-secondary/30">
            <p className="text-[8px] sm:text-[9px] font-mono text-landing-secondary uppercase flex items-center gap-0.5">
              <Sparkles className="w-2 h-2" /> Phase 3
            </p>
            <p className="text-[10px] sm:text-[11px] font-semibold text-landing-primary mt-0.5 truncate">AI Thesis</p>
          </div>
        </div>
      </div>
    </div>
  );
}
