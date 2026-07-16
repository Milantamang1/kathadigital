import { prisma } from "@/lib/prisma";

export { prisma };

export async function verifyDatabaseConnection() {
  await prisma.$queryRaw`SELECT 1`;
  return { connected: true };
}
