import { StateGraph, END } from "@langchain/langgraph";
import { AgentState } from "./state.js";
import { intakeResolver } from "./nodes/intakeResolver.js";
import { dataEngine } from "./nodes/dataEngine.js";
import { comprehensiveAnalysis } from "./nodes/comprehensiveAnalysis.js";

/**
 * Compiles the Argus single-shot LangGraph state machine.
 *
 * Graph topology:
 *
 *   __start__
 *       │
 *       ▼
 *   intakeResolver (Yahoo Search)
 *       │
 *       ▼
 *   dataEngine (Yahoo/AV Financials)
 *       │
 *       ▼
 *   comprehensiveAnalysis (1-Shot LLM)
 *       │
 *       ▼
 *    __end__
 *
 * Why this topology:
 *  - Massively reduces API limits and latency by condensing all
 *    AI analysis into a single LLM call.
 */
export function compileWorkflow() {
  const graph = new StateGraph(AgentState)
    // Register all nodes
    .addNode("intakeResolver", intakeResolver)
    .addNode("dataEngine", dataEngine)
    .addNode("comprehensiveAnalysis", comprehensiveAnalysis)

    // Wire the edges
    .addEdge("__start__", "intakeResolver")
    .addEdge("intakeResolver", "dataEngine")
    .addEdge("dataEngine", "comprehensiveAnalysis")
    .addEdge("comprehensiveAnalysis", END);

  return graph.compile();
}