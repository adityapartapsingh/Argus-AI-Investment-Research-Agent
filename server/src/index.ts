import "dotenv/config"; // Must be at the very top to load env vars before imports
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import rateLimit from "express-rate-limit";
import researchRouter from "./routes/research.js";
import historyRouter from "./routes/history.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { startKeepAlive, getKeepAliveStats } from "./services/keepAlive.js";

const app = express();
const PORT = parseInt(process.env.PORT || "4000", 10);

// Trust the first proxy (e.g., Render, Vercel) for rate limiting and IP detection
app.set("trust proxy", 1);

// ── Middleware ──

// CORS: Allow the React dev server and production frontend
const allowedOrigins = [
  "http://localhost:5173", // Vite dev server
  "http://localhost:3000", // Alternative dev port
  "https://argus-ai-investment-research-agent.vercel.app", // Deployed Vercel frontend
];
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, self-ping) or if in allowed list
      if (!origin || allowedOrigins.includes(origin) || origin.endsWith(".vercel.app") || origin.endsWith(".onrender.com")) {
        callback(null, true);
      } else {
        callback(null, true); // Permissive in production for client flexibility
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "1mb" }));

// Rate limiting: prevent abuse of the research endpoint
// 20 research requests per 15 minutes per IP
const researchLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: "Too many research requests. Please wait before trying again." },
  standardHeaders: true,
  legacyHeaders: false,
});

// ── Health Check Handlers (24/7 Live Monitoring) ──

function formatUptime(seconds: number): string {
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  parts.push(`${secs}s`);
  return parts.join(" ");
}

const handleHealthCheck = (_req: express.Request, res: express.Response) => {
  const mem = process.memoryUsage();
  const uptimeSec = process.uptime();

  res.status(200).json({
    status: "operational",
    service: "Argus AI Investment Research Agent",
    version: "2.0.0",
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(uptimeSec),
    uptimeFormatted: formatUptime(uptimeSec),
    environment: process.env.NODE_ENV || "development",
    memory: {
      rss: `${(mem.rss / 1024 / 1024).toFixed(1)} MB`,
      heapUsed: `${(mem.heapUsed / 1024 / 1024).toFixed(1)} MB`,
      heapTotal: `${(mem.heapTotal / 1024 / 1024).toFixed(1)} MB`,
    },
    keepAlive: getKeepAliveStats(),
  });
};

// Mount health check on both /api/health and /health (GET and HEAD for external uptime monitors)
app.get("/api/health", handleHealthCheck);
app.head("/api/health", (_req, res) => res.status(200).end());
app.get("/health", handleHealthCheck);
app.head("/health", (_req, res) => res.status(200).end());

// ── Application Routes ──

// Research pipeline (SSE)
app.use("/api/research", researchLimiter, researchRouter);

// History (CRUD)
app.use("/api/history", historyRouter);

// ── Error Handling ──
app.use(errorHandler);

// ── Static Frontend Serving (Production fallback if bundled together) ──
if (process.env.NODE_ENV === "production") {
  const clientDist = path.join(process.cwd(), "../client/dist");

  app.use(express.static(clientDist));

  app.get("*", (req, res, next) => {
    // If request is an API request, do not return index.html
    if (req.path.startsWith("/api/")) {
      return next();
    }
    res.sendFile(path.join(clientDist, "index.html"), (err) => {
      if (err) next();
    });
  });
}

// ── Start Server ──
app.listen(PORT, () => {
  console.log(`\n⚡ Argus server running on port ${PORT}`);
  console.log(`   Health Check: http://localhost:${PORT}/api/health`);
  console.log(`   Environment:  ${process.env.NODE_ENV || "development"}`);

  // Launch 24/7 Keep-Alive self-ping watchdog
  startKeepAlive(PORT, 10);
});
