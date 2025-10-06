// test-prisma.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function testConnection() {
  try {
    await prisma.$connect();
    console.log("✅ Connected to Prisma!");
  } catch (err) {
    console.error("❌ Connection failed:", err);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
