import { CheckCircle2, XCircle, Loader2, Circle, Terminal } from "lucide-react";
import type { ExecutionLog } from "../../types/research";
import { NODE_ORDER, NODE_LABELS, type NodeName } from "../../types/research";

interface NodeStreamProps {
  logs: ExecutionLog[];
  isStreaming: boolean;
}

export default function NodeStream({ logs, isStreaming }: NodeStreamProps) {
  if (logs.length === 0 && !isStreaming) return null;

  // Build node status map from logs
  const nodeStatus = new Map<string, { status: string; message: string; durationMs?: number }>();
  for (const log of logs) {
    if (log.node === "system") continue;
    nodeStatus.set(log.node, {
      status: log.status,
      message: log.message,
      durationMs: log.durationMs,
    });
  }

  return (
    <div className="bg-white border border-landing-outline rounded p-5 shadow-sm animate-slide-up">
      <div className="flex items-center justify-between mb-4 border-b border-landing-outline pb-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-landing-secondary" />
          <h3 className="font-newsreader text-base font-semibold text-landing-primary tracking-tight">
            {isStreaming ? "Live Autonomous Telemetry" : "Agent Execution Audit"}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {isStreaming && (
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-medium text-landing-secondary bg-landing-secondary/10 px-2.5 py-0.5 rounded border border-landing-secondary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-landing-secondary animate-ping" />
              Streaming SSE
            </span>
          )}
        </div>
      </div>

      <div className="space-y-1">
        {NODE_ORDER.map((nodeName, index) => {
          const status = nodeStatus.get(nodeName);
          const isActive = status?.status === "running";
          const isComplete = status?.status === "completed";
          const isFailed = status?.status === "failed";

          return (
            <div key={nodeName} className="flex items-start gap-3.5">
              {/* Vertical line + icon */}
              <div className="flex flex-col items-center">
                <div className={`flex-shrink-0 mt-0.5 ${isActive ? "animate-node-pulse" : ""}`}>
                  {isComplete ? (
                    <CheckCircle2 className="w-4 h-4 text-accent-emerald" />
                  ) : isFailed ? (
                    <XCircle className="w-4 h-4 text-accent-red" />
                  ) : isActive ? (
                    <Loader2 className="w-4 h-4 text-landing-secondary animate-spin" />
                  ) : (
                    <Circle className="w-4 h-4 text-landing-outline" />
                  )}
                </div>
                {index < NODE_ORDER.length - 1 && (
                  <div
                    className={`w-px h-7 mt-1 ${
                      isComplete
                        ? "bg-accent-emerald/40"
                        : isFailed
                        ? "bg-accent-red/40"
                        : "bg-landing-outline"
                    }`}
                  />
                )}
              </div>

              {/* Node info */}
              <div className="flex-1 pb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-semibold ${
                      isComplete
                        ? "text-landing-primary"
                        : isActive
                        ? "text-landing-primary font-bold"
                        : isFailed
                        ? "text-accent-red"
                        : "text-landing-tertiary/70"
                    }`}
                  >
                    {NODE_LABELS[nodeName as NodeName]}
                  </span>
                  {status?.durationMs != null && (
                    <span className="text-[10px] font-mono text-landing-tertiary bg-landing-surface-dim px-1.5 py-0.2 rounded border border-landing-outline">
                      {status.durationMs}ms
                    </span>
                  )}
                </div>
                {status?.message && (
                  <p className="text-xs text-landing-text-secondary mt-0.5 leading-relaxed font-sans">
                    {status.message}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
