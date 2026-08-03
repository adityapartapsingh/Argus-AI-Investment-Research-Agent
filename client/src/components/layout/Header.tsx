import { Zap } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border-subtle bg-surface-primary/80 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-accent-blue/10 flex items-center justify-center">
          <Zap className="w-4 h-4 text-accent-blue" />
        </div>
        <div>
          <h1 className="text-base font-bold text-text-primary tracking-tight">ARGUS</h1>
          <p className="text-[10px] font-medium text-text-muted uppercase tracking-widest">Investment Research Agent</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="badge bg-accent-blue/10 text-accent-blue border border-accent-blue/20">
          v1.0
        </span>
        <span className="badge bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/20">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse" />
          Live
        </span>
      </div>
    </header>
  );
}
