// prisma.ts or db.ts
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient({
  log: ["query", "info", "warn"], // optional: logs queries in the terminal
});

export default db;
