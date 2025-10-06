import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

export async function main() {
  console.log("🌱 Seeding database...");

  // --- Create Users ---
  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@example.com",
      password: "admin123", // 🔑 hash in production!
      role: Role.ADMIN,
    },
  });

  const supplier = await prisma.user.create({
    data: {
      name: "Supplier One",
      email: "supplier@example.com",
      password: "supplier123",
      role: Role.SUPPLIER,
      contact: 9876543210,
      address: "Supplier Street 42",
    },
  });

  const retailer = await prisma.user.create({
    data: {
      name: "Retailer One",
      email: "retailer@example.com",
      password: "retailer123",
      role: Role.RETAILER,
      contact: 9123456789,
      address: "Retailer Market Road",
    },
  });
  
  await prisma.user.upsert({
  where: { email: "admin@example.com" },
  update: {}, // what to update if exists
  create: {
    email: "admin@example.com",
    name: "Admin User",
    role: Role.ADMIN,
    password: "admin123",
        },
    });
  await prisma.user.upsert({
  where: { email: "retailer@example.com" },
  update: {}, // what to update if exists
  create: {
    email: "supplier@example.com",
    name: "Retailer One",
    role: Role.RETAILER,
    password: "retailer123",
        },
    });
  await prisma.user.upsert({
  where: { email: "supplier@example.com" },
  update: {}, // what to update if exists
  create: {
    email: "supplier@example.com",
    name: "Supplier One",
    role: Role.SUPPLIER,
    password: "supplier123",
        },
    });


  // --- Create Products ---
  const product1 = await prisma.product.create({
    data: {
      name: "Product A",
      category: "Electronics",
      cost_price: 100.0,
      selling_price: 150.0,
      batches_present: 10,
      batch_size: 5,
      min_stock: 2,
      expiry: new Date("2026-01-01"),
      supplierId: supplier.id,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: "Product B",
      category: "Stationery",
      cost_price: 20.0,
      selling_price: 35.0,
      batches_present: 50,
      batch_size: 10,
      min_stock: 5,
      expiry: new Date("2025-12-31"),
      supplierId: supplier.id,
    },
  });

  // --- Create Retailer Order ---
  await prisma.order.create({
    data: {
      retailerId: retailer.id,
      productId: product1.id,
      order_date: new Date(),
      total_amount: 300.0,
      order_status: "PENDING",
      transaction_type: "CASH",
      batches_bought: 2,
    },
  });

  // --- Create Supplier Order ---
  await prisma.suppOrder.create({
    data: {
      supplierId: supplier.id,
      productId: product2.id,
      order_date: new Date(),
      unit_price: 18.0,
      order_status: "DELIVERED",
      batches_size: 5,
    },
  });

  console.log("✅ Seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
