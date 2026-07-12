import { StateGraph, END } from "@langchain/langgraph";
import { AgentState } from "./state.js";
import { intakeResolver } from "./nodes/intakeResolver.js";
import { dataEngine } from "./nodes/dataEngine.js";
import { newsSentiment } from "./nodes/newsSentiment.js";
import { quantAnalysis } from "./nodes/quantAnalysis.js";
import { competitorBenchmark } from "./nodes/competitorBenchmark.js";
import { riskScoring } from "./nodes/riskScoring.js";
import { investmentBoard } from "./nodes/investmentBoard.js";

/**
 * Compiles the Argus 7-node LangGraph state machine.
 *
 * Graph topology:
 *
 *   __start__
 *       │
 *       ▼
 *   intakeResolver
 *       │
 *       ├──────────────────┐
 *       ▼                  ▼
 *   dataEngine        newsSentiment     ← PARALLEL FAN-OUT (Phase 1)
 *       │                  │
 *       ├──────┐           │
 *       ▼      ▼           │
 *   quantAn. competitor    │            ← PARALLEL FAN-OUT (Phase 2)
 *       │      │           │
 *       ▼      ▼           ▼
 *       └──────┴───────────┘
 *              │
 *              ▼
 *         riskScoring                   ← FAN-IN / GATE
 *              │
 *              ▼
 *       investmentBoard                 ← FINAL VERDICT
 *              │
 *              ▼
 *           __end__
 *
 * Why this topology:
 *  - dataEngine + newsSentiment run in parallel (independent data sources)
 *  - quantAnalysis + competitorBenchmark run in parallel AFTER dataEngine
 *    (both need financial data but don't depend on each other)
 *  - riskScoring is the fan-in gate that aggregates everything
 *  - investmentBoard makes the final call with full context
 */
export function compileWorkflow() {
  const graph = new StateGraph(AgentState)
    // Register all 7 nodes
    .addNode("intakeResolver", intakeResolver)
    .addNode("dataEngine", dataEngine)
    .addNode("newsSentiment", newsSentiment)
    .addNode("quantAnalysis", quantAnalysis)
    .addNode("competitorBenchmark", competitorBenchmark)
    .addNode("riskScoring", riskScoring)
    .addNode("investmentBoard", investmentBoard)

    // Wire the edges
    // Entry point
    .addEdge("__start__", "intakeResolver")

    // Phase 1 parallel fan-out: intakeResolver splits to dataEngine + newsSentiment
    .addEdge("intakeResolver", "dataEngine")
    .addEdge("intakeResolver", "newsSentiment")

    // Phase 2 parallel fan-out: dataEngine splits to quantAnalysis + competitorBenchmark
    .addEdge("dataEngine", "quantAnalysis")
    .addEdge("dataEngine", "competitorBenchmark")

    // Fan-in: all parallel branches converge at riskScoring
    .addEdge("quantAnalysis", "riskScoring")
    .addEdge("competitorBenchmark", "riskScoring")
    .addEdge("newsSentiment", "riskScoring")

    // Final verdict
    .addEdge("riskScoring", "investmentBoard")
    .addEdge("investmentBoard", END);

  return graph.compile();
}