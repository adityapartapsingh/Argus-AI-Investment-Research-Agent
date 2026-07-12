import { Router } from "express";
import type { Request, Response } from "express";
import prisma from "../db.js";

const router = Router();

/**
 * GET /api/history
 *
 * Returns recent research sessions for the sidebar.
 * Supports pagination via ?page=1&limit=20 query params.
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string) || 20));
    const skip = (page - 1) * limit;

    const browserSessionId = req.query.browserSessionId as string | undefined;

    const [sessions, total] = await Promise.all([
      prisma.researchSession.findMany({
        where: browserSessionId ? { browserSessionId } : undefined,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        select: {
          id: true,
          companyName: true,
          decision: true,
          compositeScore: true,
          riskLevel: true,
          executionTimeMs: true,
          createdAt: true,
        },
      }),
      prisma.researchSession.count({
        where: browserSessionId ? { browserSessionId } : undefined,
      }),
    ]);

    res.json({
      sessions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("[History] List error:", err);
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

/**
 * GET /api/history/:id
 *
 * Returns full details of a past research session, including
 * all node execution logs and complete analysis data.
 */
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const session = await prisma.researchSession.findUnique({
      where: { id: req.params.id },
      include: {
        nodeLogs: {
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!session) {
      res.status(404).json({ error: "Session not found" });
      return;
    }

    res.json(session);
  } catch (err) {
    console.error("[History] Detail error:", err);
    res.status(500).json({ error: "Failed to fetch session details" });
  }
});

export default router;
