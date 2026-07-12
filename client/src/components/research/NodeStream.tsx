import { CheckCircle2, XCircle, Loader2, Circle } from "lucide-react";
import type { ExecutionLog } from "../../types/research";
import { NODE_ORDER, NODE_LABELS, type NodeName } from "../../types/research";

interface NodeStreamProps {
  logs: ExecutionLog[];
  isStreaming: boolean;
}

/**
 * Live pipeline visualizer showing 3-node state transitions.
 * Each node shows: icon (pending/running/complete/failed) + name + message
 */
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
    <div className="bg-surface-raised border border-border-subtle rounded-2xl p-5 animate-slide-up">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
        <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider">
          {isStreaming ? "Live Pipeline Stream" : "Execution Log"}
        </h3>
      </div>

      <div className="space-y-0.5">
        {NODE_ORDER.map((nodeName, index) => {
          const status = nodeStatus.get(nodeName);
          const isActive = status?.status === "running";
          const isComplete = status?.status === "completed";
          const isFailed = status?.status === "failed";
          const isPending = !status;

          return (
            <div key={nodeName} className="flex items-start gap-3">
              {/* Vertical line + icon */}
              <div className="flex flex-col items-center">
                <div className={`flex-shrink-0 mt-0.5 ${isActive ? "animate-node-pulse" : ""}`}>
                  {isComplete ? (
                    <CheckCircle2 className="w-4 h-4 text-accent-emerald" />
                  ) : isFailed ? (
                    <XCircle className="w-4 h-4 text-accent-red" />
                  ) : isActive ? (
                    <Loader2 className="w-4 h-4 text-accent-blue animate-spin" />
                  ) : (
                    <Circle className="w-4 h-4 text-text-muted opacity-30" />
                  )}
                </div>
                {index < NODE_ORDER.length - 1 && (
                  <div className={`w-px h-6 mt-1 ${
                    isComplete ? "bg-accent-emerald/30" :
                    isFailed ? "bg-accent-red/30" :
                    "bg-border-subtle"
                  }`} />
                )}
              </div>

              {/* Node info */}
              <div className="flex-1 pb-3">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold ${
                    isComplete ? "text-text-primary" :
                    isActive ? "text-accent-blue" :
                    isFailed ? "text-accent-red" :
                    "text-text-muted"
                  }`}>
                    {NODE_LABELS[nodeName as NodeName]}
                  </span>
                  {status?.durationMs && (
                    <span className="text-[9px] font-mono text-text-muted">
                      {status.durationMs}ms
                    </span>
                  )}
                </div>
                {status?.message && (
                  <p className="text-[11px] text-text-secondary mt-0.5 leading-relaxed">
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
