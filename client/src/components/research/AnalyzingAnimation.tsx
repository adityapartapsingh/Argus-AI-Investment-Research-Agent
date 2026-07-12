import { motion } from "framer-motion";
import { Search, BrainCircuit, Activity, LineChart } from "lucide-react";

export default function AnalyzingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Glowing background */}
        <div className="absolute inset-0 bg-accent-blue/10 blur-3xl rounded-full animate-pulse" />
        
        {/* Outer rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-dashed border-accent-blue/30"
        />
        
        {/* Inner rotating ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 rounded-full border border-accent-indigo/20"
        />

        {/* Floating Icons */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-4 -left-4 bg-surface-raised p-3 rounded-2xl border border-border-subtle shadow-xl"
        >
          <Search className="w-5 h-5 text-accent-blue" />
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute -bottom-2 -right-4 bg-surface-raised p-3 rounded-2xl border border-border-subtle shadow-xl"
        >
          <LineChart className="w-5 h-5 text-accent-emerald" />
        </motion.div>

        <motion.div
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/2 -right-8 -translate-y-1/2 bg-surface-raised p-3 rounded-2xl border border-border-subtle shadow-xl"
        >
          <Activity className="w-5 h-5 text-accent-purple" />
        </motion.div>

        {/* Center Brain Icon */}
        <div className="relative bg-gradient-to-br from-accent-blue to-accent-indigo p-6 rounded-full shadow-[0_0_40px_rgba(59,130,246,0.3)]">
          <BrainCircuit className="w-12 h-12 text-white animate-pulse" />
        </div>
      </div>

      <div className="mt-12 text-center space-y-3">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-indigo">
          Synthesizing Data
        </h2>
        <div className="flex items-center justify-center gap-2 text-sm text-text-secondary">
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Running comprehensive AI analysis
          </motion.span>
          <span className="flex gap-0.5">
            <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}>.</motion.span>
            <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}>.</motion.span>
            <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}>.</motion.span>
          </span>
        </div>
      </div>
    </div>
  );
}
