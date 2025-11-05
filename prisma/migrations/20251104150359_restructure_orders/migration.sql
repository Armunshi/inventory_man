/*
  Warnings:

  - You are about to drop the column `batches_bought` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `batches_size` on the `SuppOrder` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `SuppOrder` table. All the data in the column will be lost.
  - You are about to drop the column `unit_price` on the `SuppOrder` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Order" DROP CONSTRAINT "Order_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."SuppOrder" DROP CONSTRAINT "SuppOrder_productId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "batches_bought",
DROP COLUMN "productId";

-- AlterTable
ALTER TABLE "SuppOrder" DROP COLUMN "batches_size",
DROP COLUMN "productId",
DROP COLUMN "unit_price",
ADD COLUMN     "total_amount" DECIMAL(10,2);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "unit_price" DECIMAL(10,2),
    "batch_size" INTEGER,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SuppOrderItem" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "unit_price" DECIMAL(10,2),
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "batch_size" INTEGER,

    CONSTRAINT "SuppOrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "OrderItem_orderId_idx" ON "OrderItem"("orderId");

-- CreateIndex
CREATE INDEX "OrderItem_productId_idx" ON "OrderItem"("productId");

-- CreateIndex
CREATE INDEX "SuppOrderItem_orderId_idx" ON "SuppOrderItem"("orderId");

-- CreateIndex
CREATE INDEX "SuppOrderItem_productId_idx" ON "SuppOrderItem"("productId");

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuppOrderItem" ADD CONSTRAINT "SuppOrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "SuppOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuppOrderItem" ADD CONSTRAINT "SuppOrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
