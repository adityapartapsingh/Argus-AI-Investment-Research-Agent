# Design System & UI/UX Specifications — Argus AI

---

## 1. Design Principles

Argus employs a **Unified Modern Institutional Design System** generated and aligned via **Stitch** (`projects/8110658235605688376`). The research dashboard and landing page share an identical visual language, combining the editorial gravity of *The Wall Street Journal* and *Bridgewater Associates* with modern software craft (Linear, Stripe).

1. **Seamless Continuity:** The research dashboard and public landing page share an identical color palette, typography hierarchy, card elevation, and border treatments.
2. **Editorial Gravitas:** High-contrast serif headlines (`Newsreader`) paired with clean functional sans-serif body text (`Inter`) and monospace numbers (`JetBrains Mono`).
3. **Deterministic Transparency:** Live Server-Sent Events (SSE) telemetry, animated radar sweeps, and millisecond counters ensure the user always understands the agent's internal progress.
4. **Decisive Conviction:** Investment verdicts (`INVEST` vs. `PASS`) feature distinct semantic indicators—rich emerald with subtle gold accents for affirmative decisions, and crisp crimson red for pass recommendations.
5. **Data Density with Luxury Spacing:** High-information-density grids that never feel cramped, anchored by consistent 4px/8px modular spacing and 1px hairline borders (`#e2e8f0`).

---

## 2. Color Palette & Design Tokens

The unified color system is anchored in **Deep Navy**, **Argus Gold**, **Slate Grays**, and crisp **White Surfaces**.

### 2.1 Surfaces & Canvas
| Token | Hex Value | Semantic Usage |
| :--- | :--- | :--- |
| `--color-surface-base` / `--color-landing-bg` | `#F7F9FB` | Soft, modern off-white canvas for landing and dashboard. |
| `--color-surface-primary` / `--color-landing-surface` | `#FFFFFF` | Crisp white card, modal, and panel backgrounds. |
| `--color-surface-dim` / `--color-landing-surface-dim` | `#F2F4F6` | Secondary panels, pill chips, table rows, and inputs. |
| `--color-surface-overlay` | `#F1F5F9` | Hover states, elevated dropdowns, and search drawers. |

### 2.2 Borders & Outlines
| Token | Hex Value | Semantic Usage |
| :--- | :--- | :--- |
| `--color-border-subtle` / `--color-landing-outline` | `#E2E8F0` | Subtle hairline borders defining structural containers. |
| `--color-border-default` | `#CBD5E1` | Input focus boundaries and divider rules. |
| `--color-border-strong` | `#94A3B8` | Active element highlights and card hover outlines. |

### 2.3 Typography Colors
| Token | Hex Value | Semantic Usage |
| :--- | :--- | :--- |
| `--color-text-primary` / `--color-landing-primary` | `#0F172A` | Deep Navy: Headings, primary metrics, and emphatic text. |
| `--color-text-secondary` / `--color-landing-tertiary`| `#475569` | Slate: Body paragraphs, descriptions, secondary labels. |
| `--color-text-muted` | `#64748B` | Muted Slate: Timestamps, units, and subtle telemetry. |

### 2.4 Brand Accents & Semantic Decision Colors
| Token | Hex / RGBA Value | Semantic Usage |
| :--- | :--- | :--- |
| `--color-accent-navy` | `#0F172A` | Primary brand tone and primary action button fills. |
| `--color-accent-gold` / `--color-landing-secondary` | `#D4AF37` | Signature Argus Gold: Pro badges, chart series, radar rings. |
| `--color-invest` | `#059669` | Rich Emerald: `INVEST` verdict, positive growth, healthy FCF. |
| `--color-invest-bg` | `rgba(5, 150, 105, 0.07)` | Subtle green tint for affirmative decision cards. |
| `--color-invest-border` | `rgba(5, 150, 105, 0.35)` | Border accent for affirmative decision states. |
| `--color-pass` | `#DC2626` | Crimson Red: `PASS` verdict, excessive leverage, risk warnings. |
| `--color-pass-bg` | `rgba(220, 38, 38, 0.07)` | Subtle red tint for caution/pass banners. |
| `--color-pass-border` | `rgba(220, 38, 38, 0.35)` | Border accent for cautionary and pass states. |
| `--color-accent-amber` | `#D97706` | Amber: Medium risk profile, cautionary multiples. |

---

## 3. Typography Hierarchy

Imported via Google Fonts:
```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,400;1,6..72,500&display=swap");
```

| Font Family | CSS Token | Usage |
| :--- | :--- | :--- |
| **Newsreader** | `var(--font-newsreader)` | Brand wordmark, page titles, section headings, decision titles, and diligence memos. |
| **Inter** | `var(--font-sans)` | Primary UI text, buttons, form inputs, tooltips, and general copy. |
| **JetBrains Mono** | `var(--font-mono)` | Tickers (`RELIANCE.NS`), numeric metrics (`P/E: 24.50`), timestamps, and chart coordinates. |

---

## 4. UI/UX Component Specifications

### 4.1 Header (`Header.tsx`)
- **Brand Identity:** Newsreader wordmark "Argus" with "PRO" gold badge and institutional subtitle.
- **Home Navigation:** Smooth return link to the public showcase.
- **Live Market Status Marquee:** Real-time green pulsing beacons tracking NSE, BSE, and US pre-market status.
- **Engine Status:** Live single-shot LangGraph indicator badge.

### 4.2 Research Activity Drawer (`Sidebar.tsx`)
- **Clean White Architecture:** `bg-white` with `border-r border-landing-outline`.
- **Search & Filter:** Instant search box filtering past research runs.
- **Dossier Cards:** Displays company name, decision pill, composite score (`88/100`), execution duration, and formatted date.

### 4.3 Input Terminal (`InputPanel.tsx`)
- **Market Segment Switcher:** Instant toggles for `NSE / BSE (India)` (prioritized), `US (NYSE/NASDAQ)`, and `Global`.
- **Search Command Bar:** Sleek input with keyboard shortcut `↵ Enter` pill.
- **Quick Benchmark Chips:** Instant one-click triggers for benchmark stocks (`Reliance`, `Tata Motors`, `HDFC Bank`, `Apple`, `NVIDIA`).

### 4.4 Agent Telemetry & Radar (`AnalyzingAnimation.tsx` & `NodeStream.tsx`)
- **Concentric Radar Animation:** Framer Motion animated dashed orbital rings in Navy and Argus Gold with central glowing AI core.
- **Floating Telemetry Badges:** Live status pills indicating active scrapers and model stages.
- **Step Progress Audit:** Chronological execution log with millisecond timers and checkmark states.

### 4.5 Hero Decision Scorecard (`Scorecard.tsx`)
- **High-Impact Verdict Banner:** Bold `INVEST (Overweight)` or `PASS (Underweight)` indicator with dual-tone glowing borders.
- **Progress Gauge:** Composite Alpha score with animated progress bar and confidence percentage.
- **Executive Diligence Memo:** Editorial italicized memo formatted in Newsreader serif.

### 4.6 Visual Financial Analytics (`RevenueChart.tsx`)
- **Interactive Tab Switcher:** Toggle between "Annual Trajectory" (Revenue & Net Income multi-year bars) and "1Y Price Trend" (Area chart).
- **Branded Gradients:** Navy and Argus Gold bars with dark institutional tooltips.

### 4.7 Fundamental KPI Grid (`QuantMetrics.tsx`)
- **8 Modular Ratio Cards:** Valuation, leverage, profitability, and cash flow ratios with benchmark comparison notes and color-coded health indicators.

### 4.8 Peer Benchmarking Table (`CompetitorTable.tsx`)
- **Competitor Multiples:** Side-by-side comparison across P/E, Market Cap, Growth, and Margins with the target company highlighted in a distinct container.

### 4.9 Empty State Hero Showcase (`App.tsx`)
- **Visual Photo / 3D Asset (`hero.png`):** Floating embossed 3D icon with Argus AI version badge.
- **3 Core Pillars:** Institutional summaries for Sub-10s synthesis, unauthenticated fundamentals, and objective scoring.
