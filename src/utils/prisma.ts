import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"], // Optional: ডিবাগ করতে চাইলে রাখো
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
