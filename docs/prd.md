# Product Requirements Document (PRD) — Argus AI

---

## 1. Product Overview
**Argus** is an elite, autonomous AI-powered institutional investment research platform. It transforms raw company inquiries into institutional-grade equity research reports within seconds. By combining real-time ticker resolution, unauthenticated financial scraping, single-shot Gemini LLM financial synthesis, and live Server-Sent Events (SSE) streaming, Argus delivers deep fundamental, quantitative, and qualitative investment memos with actionable decisions (`INVEST` vs. `PASS`).

Argus bridges the gap between raw data terminals (Bloomberg, Refinitiv) and generative AI, presenting an interactive, dark-terminal command center for modern equity analysts, fund managers, and retail investors.

---

## 2. Problem Statement
Traditional equity research suffers from significant bottlenecks:
- **Time-Intensive Workflows:** A comprehensive fundamental equity research memo requires 4 to 8 hours of manual data collection across balance sheets, income statements, cash flow statements, and competitor benchmarks.
- **Fragmented Data Ecosystems:** Analysts navigate disjointed interfaces for price charts, valuation metrics, SEC/exchange filings, and news sentiment.
- **Prohibitive Terminal Costs:** Legacy institutional tools like Bloomberg Terminals or FactSet cost $24,000+ annually per seat, locking out independent advisors, boutique funds, and retail investors.
- **Latency & Reliability in AI Agents:** Typical multi-agent swarms with chained LLM calls suffer from severe latency (30-60+ seconds), compounding token costs, and high failure rates due to rate limits.
- **Black-Box AI Outputs:** Most AI summary tools present unstructured or unverified prose without transparent step-by-step reasoning, quantitative scorecards, or audit trails.

---

## 3. Goals & Objectives

### Primary Goals
1. **Sub-10-Second Synthesis:** Deliver a complete, institutional-grade equity analysis memo from input to final decision in under 10 seconds.
2. **Transparent Agent Execution:** Stream real-time node execution logs to the frontend via Server-Sent Events (SSE) so users can observe the agent's step-by-step reasoning.
3. **Data-Driven Decision Framework:** Synthesize both quantitative metrics (P/E, P/B, Debt/Equity, ROE, FCF, Operating Margin) and qualitative dimensions (moat, risks, competitive positioning) into a standardized `INVEST` or `PASS` recommendation accompanied by an objective composite score (0–100) and confidence rating.
4. **Resilient Architecture:** Ensure zero downtime and resilience against API rate limits via triple-redundancy Gemini API failover and unauthenticated Yahoo Finance data sourcing.

### Success Metrics
| Metric | Target |
| :--- | :--- |
| **End-to-End Analysis Latency** | ≤ 7 seconds average |
| **Ticker Resolution Accuracy** | ≥ 98% for global and regional (NSE/BSE) equities |
| **LLM Synthesis Availability** | 99.9% uptime using triple API key failover |
| **User Transparency** | 100% of pipeline stages streamed live to UI via SSE |

---

## 4. Target Users
- **Boutique Investment Funds & Family Offices:** Seeking rapid first-pass screening and automated equity diligence memos before deep-dive modeling.
- **Equity Research Analysts & Associates:** Needing instant quantitative benchmarking, historical revenue trends, and competitor comparison matrices.
- **Registered Investment Advisors (RIAs) & Wealth Managers:** Looking for objective, defensible investment summaries and risk breakdowns to share with clients.
- **Active Retail Investors & Prosumers:** Demanding professional-tier analytics, transparent metrics, and terminal-grade visualizations without institutional cost barriers.

---

## 5. Core Features

### 5.1 Intelligent Intake & Ticker Resolution
- **Fuzzy Search & Directory Resolution:** Accepts plain-text corporate queries (e.g., "Tata Motors", "Tesla", "Reliance Industries") and resolves them to exact exchange tickers (e.g., `TATAMOTORS.NS`, `TSLA`, `RELIANCE.NS`).
- **Exchange Prioritization:** Intelligently prioritizes National Stock Exchange of India (NSE) and Bombay Stock Exchange (BSE) when applicable, alongside major global exchanges (NASDAQ, NYSE).

### 5.2 Real-Time Quantitative Data Engine
- **Fundamental Ingestion:** Real-time extraction of key valuation and financial health metrics:
  - Valuation: P/E Ratio, P/B Ratio, Market Capitalization.
  - Solvency & Efficiency: Debt-to-Equity, Return on Equity (ROE), Operating Margin.
  - Cash Flow: Trailing Twelve Months (TTM) Free Cash Flow, Total Cash vs. Total Debt.
  - Growth: YoY Revenue Growth, Historical Revenue & Net Income trends (multi-year).
  - Price & Volume: 1-year historical daily pricing for visual technical inspection.
- **Zero-Auth Scraping Engine:** Employs resilient data scrapers to prevent third-party quota exhaustion.

### 5.3 Single-Shot Comprehensive Analysis Engine
- **LangGraph State Orchestration:** Uses a streamlined 3-node state graph for maximum throughput and deterministic state tracking.
- **Structured LLM Evaluation:** Prompts Google Gemini with pre-gathered quantitative telemetry, enforcing strict JSON output schemas:
  - Investment recommendation: `INVEST` or `PASS`.
  - Composite score: 0 to 100.
  - Risk Level: `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`.
  - Confidence Level: 0 to 100%.
  - Qualitative thesis, risk catalysts, and competitive moat analysis.
- **Competitor Benchmarking:** Auto-identifies direct industry peers and extracts comparative valuation metrics (P/E, Market Cap, Revenue Growth, Margins).

### 5.4 Live Execution Streaming (SSE)
- **Node-by-Node Pipeline Observability:** Real-time streaming of agent execution phases (`intakeResolver` ➔ `dataEngine` ➔ `comprehensiveAnalysis`).
- **Auditable Log Terminal:** Interactive console on the frontend detailing node status (`running`, `completed`, `failed`), duration in milliseconds, and payloads.

### 5.5 Institutional Terminal Dashboard
- **Scorecard & Recommendation Banner:** High-visibility decision indicators with color-coded status badges and confidence meters.
- **Financial Metric Grid:** Clean, modular cards grouping valuation, profitability, leverage, and liquidity ratios.
- **Interactive Revenue & Margin Charts:** Multi-year revenue and net income visualization using Recharts.
- **Competitor Comparison Table:** Side-by-side benchmarking against primary market rivals.
- **Risk Assessment & Catalysts:** Bulleted breakdowns of operational risks, macro vulnerabilities, and upside drivers.

### 5.6 Session & Research History
- **Persistent Storage:** Full analysis sessions, quantitative snapshots, node logs, and verdicts stored in PostgreSQL via Prisma ORM.
- **History Drawer:** Quick recall of past research runs grouped by browser session or user ID.
