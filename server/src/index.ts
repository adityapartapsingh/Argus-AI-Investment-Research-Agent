import "dotenv/config"; // Must be at the very top to load env vars before imports
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import researchRouter from "./routes/research.js";
import historyRouter from "./routes/history.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = parseInt(process.env.PORT || "4000", 10);

// ── Middleware ──

// CORS: Allow the React dev server
app.use(cors({
  origin: [
    "http://localhost:5173",  // Vite dev server
    "http://localhost:3000",  // Alternative dev port
  ],
  credentials: true,
}));

app.use(express.json({ limit: "1mb" }));

// Rate limiting: prevent abuse of the research endpoint
// 10 research requests per 15 minutes per IP (free API limits)
const researchLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Too many research requests. Please wait before trying again." },
  standardHeaders: true,
  legacyHeaders: false,
});

// ── Routes ──

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "operational",
    service: "Argus Investment Research Agent",
    version: "1.0.0",
    uptime: process.uptime(),
  });
});

// Research pipeline (SSE)
app.use("/api/research", researchLimiter, researchRouter);

// History (CRUD)
app.use("/api/history", historyRouter);

// ── Error Handling ──
app.use(errorHandler);

// ── Start Server ──
app.listen(PORT, () => {
  console.log(`\n⚡ Argus server running on http://localhost:${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health`);
  console.log(`   Environment: ${process.env.NODE_ENV || "development"}\n`);
});