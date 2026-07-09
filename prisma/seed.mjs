import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const { ADMIN_EMAIL, ADMIN_PASSWORD, DATABASE_URL } = process.env;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is required.");
}

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required.");
}

const adapter = new PrismaPg({ connectionString: DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);

await prisma.adminUser.upsert({
  where: { email: ADMIN_EMAIL.toLowerCase() },
  update: {
    passwordHash,
  },
  create: {
    name: "Katha Digital Admin",
    email: ADMIN_EMAIL.toLowerCase(),
    role: "admin",
    passwordHash,
  },
});

await prisma.$disconnect();

console.log(`Admin user ready: ${ADMIN_EMAIL.toLowerCase()}`);
