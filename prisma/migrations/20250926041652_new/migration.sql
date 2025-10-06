/*
  Warnings:

  - You are about to drop the `Products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Retailer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Retailer_Orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Supp_Orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Supplier` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('ADMIN', 'SUPPLIER', 'RETAILER');

-- DropForeignKey
ALTER TABLE "public"."Products" DROP CONSTRAINT "Products_supp_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Retailer_Orders" DROP CONSTRAINT "Retailer_Orders_prod_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Retailer_Orders" DROP CONSTRAINT "Retailer_Orders_r_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Supp_Orders" DROP CONSTRAINT "Supp_Orders_prod_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Supp_Orders" DROP CONSTRAINT "Supp_Orders_supp_id_fkey";

-- DropTable
DROP TABLE "public"."Products";

-- DropTable
DROP TABLE "public"."Retailer";

-- DropTable
DROP TABLE "public"."Retailer_Orders";

-- DropTable
DROP TABLE "public"."Supp_Orders";

-- DropTable
DROP TABLE "public"."Supplier";

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL,
    "contact" INTEGER,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT,
    "cost_price" DECIMAL(10,2),
    "selling_price" DECIMAL(10,2),
    "batches_present" INTEGER,
    "batch_size" INTEGER,
    "min_stock" INTEGER,
    "expiry" TIMESTAMP(3),
    "supplierId" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Order" (
    "id" SERIAL NOT NULL,
    "retailerId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "order_date" TIMESTAMP(3),
    "total_amount" DECIMAL(10,2),
    "order_status" TEXT,
    "transaction_type" TEXT,
    "batches_bought" INTEGER,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SuppOrder" (
    "supplierId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "order_date" TIMESTAMP(3),
    "unit_price" DECIMAL(10,2),
    "order_status" TEXT,
    "batches_size" INTEGER,

    CONSTRAINT "SuppOrder_pkey" PRIMARY KEY ("supplierId","productId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_retailerId_fkey" FOREIGN KEY ("retailerId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SuppOrder" ADD CONSTRAINT "SuppOrder_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SuppOrder" ADD CONSTRAINT "SuppOrder_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
