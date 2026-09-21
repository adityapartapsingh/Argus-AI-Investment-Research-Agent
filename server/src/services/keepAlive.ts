/**
 * Argus 24/7 Keep-Alive Service
 *
 * Prevents cloud hosting providers (e.g., Render free tier) from spinning down
 * due to 15 minutes of inactivity.
 *
 * Render automatically provides `RENDER_EXTERNAL_URL` in production.
 * This service pings the public health check endpoint every 10-12 minutes
 * (well before the 15-minute inactivity threshold).
 */

interface KeepAliveStats {
  enabled: boolean;
  targetUrl: string;
  intervalMinutes: number;
  totalPings: number;
  successfulPings: number;
  failedPings: number;
  lastPingAt: string | null;
  lastStatus: number | null;
  lastDurationMs: number | null;
  lastError: string | null;
}

const stats: KeepAliveStats = {
  enabled: false,
  targetUrl: "",
  intervalMinutes: 10,
  totalPings: 0,
  successfulPings: 0,
  failedPings: 0,
  lastPingAt: null,
  lastStatus: null,
  lastDurationMs: null,
  lastError: null,
};

let timerId: NodeJS.Timeout | null = null;

/**
 * Resolves the target URL to ping:
 * 1. Explicit `SELF_PING_URL` env variable
 * 2. `RENDER_EXTERNAL_URL` automatically provided by Render
 * 3. `SERVER_URL` or `APP_URL`
 * 4. Production fallback to the deployed Render address
 * 5. Development fallback to local port
 */
function resolveTargetUrl(port: number): string {
  if (process.env.SELF_PING_URL) {
    return process.env.SELF_PING_URL;
  }

  const renderUrl = process.env.RENDER_EXTERNAL_URL;
  if (renderUrl) {
    const cleanUrl = renderUrl.endsWith("/") ? renderUrl.slice(0, -1) : renderUrl;
    return `${cleanUrl}/api/health`;
  }

  const appUrl = process.env.SERVER_URL || process.env.APP_URL;
  if (appUrl) {
    const cleanUrl = appUrl.endsWith("/") ? appUrl.slice(0, -1) : appUrl;
    return `${cleanUrl}/api/health`;
  }

  if (process.env.NODE_ENV === "production") {
    return "https://argus-ai-investment-research-agent.onrender.com/api/health";
  }

  return `http://localhost:${port}/api/health`;
}

/**
 * Performs a single HTTP GET ping against the health endpoint.
 */
async function executePing(): Promise<void> {
  const startTime = Date.now();
  stats.totalPings += 1;
  stats.lastPingAt = new Date().toISOString();

  try {
    // Timeout ping after 15 seconds so it never hangs
    const response = await fetch(stats.targetUrl, {
      method: "GET",
      headers: {
        "User-Agent": "Argus-24x7-KeepAlive-Worker/1.0",
        "X-Keep-Alive-Ping": "true",
      },
      signal: AbortSignal.timeout(15000),
    });

    const durationMs = Date.now() - startTime;
    stats.lastDurationMs = durationMs;
    stats.lastStatus = response.status;
    stats.lastError = null;

    if (response.ok) {
      stats.successfulPings += 1;
      console.log(
        `[Keep-Alive 24/7] 🟢 Health ping #${stats.totalPings} OK (${response.status}) in ${durationMs}ms -> ${stats.targetUrl}`
      );
    } else {
      stats.failedPings += 1;
      stats.lastError = `HTTP ${response.status} ${response.statusText}`;
      console.warn(
        `[Keep-Alive 24/7] ⚠️ Health ping #${stats.totalPings} returned status ${response.status} in ${durationMs}ms -> ${stats.targetUrl}`
      );
    }
  } catch (err) {
    const durationMs = Date.now() - startTime;
    stats.lastDurationMs = durationMs;
    stats.lastStatus = null;
    stats.failedPings += 1;
    stats.lastError = err instanceof Error ? err.message : String(err);

    console.warn(
      `[Keep-Alive 24/7] ⚠️ Health ping #${stats.totalPings} failed (${stats.lastError}) in ${durationMs}ms -> ${stats.targetUrl}. Next retry in ${stats.intervalMinutes}m.`
    );
  }
}

/**
 * Initializes and starts the 24/7 self-ping keep-alive loop.
 *
 * @param port The HTTP port the Express server is listening on.
 * @param intervalMinutes Interval in minutes between pings (Default: 10 minutes).
 */
export function startKeepAlive(port: number, intervalMinutes: number = 10): void {
  // Can be disabled via env var if explicitly desired
  if (process.env.DISABLE_KEEP_ALIVE === "true") {
    console.log("[Keep-Alive 24/7] Disabled via DISABLE_KEEP_ALIVE=true");
    stats.enabled = false;
    return;
  }

  // Allow interval override via env (e.g., PING_INTERVAL_MINUTES=10)
  const envMinutes = parseInt(process.env.PING_INTERVAL_MINUTES || "", 10);
  const activeIntervalMinutes = !isNaN(envMinutes) && envMinutes > 0 ? envMinutes : intervalMinutes;

  stats.enabled = true;
  stats.intervalMinutes = activeIntervalMinutes;
  stats.targetUrl = resolveTargetUrl(port);

  const intervalMs = activeIntervalMinutes * 60 * 1000;

  console.log(
    `\n🛡️ [Keep-Alive 24/7] Initialized keep-alive watchdog:` +
      `\n   Target: ${stats.targetUrl}` +
      `\n   Interval: Every ${activeIntervalMinutes} minutes` +
      `\n   Purpose: Prevent Render inactivity sleep (15m threshold)\n`
  );

  // Initial warmup ping after 15 seconds to verify readiness
  setTimeout(() => {
    executePing().catch(() => {});
  }, 15000);

  // Recurring interval ping
  timerId = setInterval(() => {
    executePing().catch(() => {});
  }, intervalMs);

  // Do not block Node process exit on shutdown
  if (timerId.unref) {
    timerId.unref();
  }
}

/**
 * Returns telemetry data for the health endpoint.
 */
export function getKeepAliveStats(): KeepAliveStats {
  return { ...stats };
}
