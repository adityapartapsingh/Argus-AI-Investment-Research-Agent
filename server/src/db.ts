import "dotenv/config";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { PrismaClient } = require("@prisma/client");
import { PrismaNeon } from "@prisma/adapter-neon";

/**
 * Singleton Prisma client with Neon adapter.
 *
 * Prisma 7 requires explicit driver adapters.
 * PrismaNeon uses Neon's serverless driver for optimal
 * connection handling with their pooler.
 */
const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

export default prisma;
