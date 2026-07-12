import "dotenv/config"; // Must be at the very top to load env vars before imports
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import rateLimit from "express-rate-limit";
import researchRouter from "./routes/research.js";
import historyRouter from "./routes/history.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = parseInt(process.env.PORT || "4000", 10);

// ── Middleware ──

// CORS: Allow the React dev server and production frontend
const allowedOrigins = [
  "http://localhost:5173",  // Vite dev server
  "http://localhost:3000",  // Alternative dev port
];
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
  origin: allowedOrigins,
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

// ── Static Frontend Serving (Production) ──
if (process.env.NODE_ENV === "production") {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  // In production, the compiled index.js is at server/dist/index.js (if built) 
  // or we run via tsx directly in server/src/index.ts. 
  // We resolve the client dist relative to the current working directory (server)
  const clientDist = path.join(process.cwd(), "../client/dist");
  
  app.use(express.static(clientDist));
  
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
}

// ── Start Server ──
app.listen(PORT, () => {
  console.log(`\n⚡ Argus server running on http://localhost:${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health`);
  console.log(`   Environment: ${process.env.NODE_ENV || "development"}\n`);
});

