import type { Request, Response, NextFunction } from "express";

/**
 * Global error handling middleware.
 * 
 * Catches unhandled errors from route handlers and returns
 * consistent JSON error responses. In production, you'd also
 * log to an error tracking service (Sentry, etc.).
 */
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error("[ErrorHandler]", err.message);
  console.error(err.stack);

  const statusCode = (err as any).statusCode || 500;
  
  res.status(statusCode).json({
    error: {
      message: process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
      ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
    },
  });
}
