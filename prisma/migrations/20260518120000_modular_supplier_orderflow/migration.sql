-- CreateEnum
CREATE TYPE "WorkflowOrderType" AS ENUM ('SUPPLIER_ORDER', 'RETAILER_ORDER');

-- CreateEnum
CREATE TYPE "StageStatus" AS ENUM ('PENDING', 'ACTIVE', 'COMPLETED', 'SKIPPED', 'BLOCKED');

-- CreateEnum
CREATE TYPE "OrderLifecycleStatus" AS ENUM ('OPEN', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "CustomFieldType" AS ENUM ('TEXT', 'NUMBER', 'DATE', 'BOOLEAN', 'SELECT');

-- AlterTable
ALTER TABLE "User" ADD COLUMN "businessId" INTEGER;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN "businessId" INTEGER;

-- AlterTable
ALTER TABLE "Warehouse" ADD COLUMN "businessId" INTEGER;

-- AlterTable
ALTER TABLE "SuppOrder"
ADD COLUMN "businessId" INTEGER,
ADD COLUMN "workflowTemplateId" INTEGER,
ADD COLUMN "currentStageId" INTEGER,
ADD COLUMN "lifecycleStatus" "OrderLifecycleStatus" NOT NULL DEFAULT 'OPEN';

-- CreateTable
CREATE TABLE "Business" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkflowTemplate" (
    "id" SERIAL NOT NULL,
    "businessId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "orderType" "WorkflowOrderType" NOT NULL DEFAULT 'SUPPLIER_ORDER',
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkflowTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkflowStage" (
    "id" SERIAL NOT NULL,
    "templateId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "isRequired" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkflowStage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SuppOrderStageProgress" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "stageId" INTEGER NOT NULL,
    "status" "StageStatus" NOT NULL DEFAULT 'PENDING',
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SuppOrderStageProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderFieldDefinition" (
    "id" SERIAL NOT NULL,
    "businessId" INTEGER NOT NULL,
    "templateId" INTEGER,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "type" "CustomFieldType" NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "options" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderFieldDefinition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SuppOrderFieldValue" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "fieldId" INTEGER NOT NULL,
    "value" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SuppOrderFieldValue_pkey" PRIMARY KEY ("id")
);

-- Backfill a default business and workflow for existing data.
INSERT INTO "Business" ("name", "updatedAt")
VALUES ('Default Business', CURRENT_TIMESTAMP);

WITH default_business AS (
  SELECT "id" FROM "Business" WHERE "name" = 'Default Business' ORDER BY "id" ASC LIMIT 1
)
UPDATE "User" SET "businessId" = (SELECT "id" FROM default_business) WHERE "businessId" IS NULL;

WITH default_business AS (
  SELECT "id" FROM "Business" WHERE "name" = 'Default Business' ORDER BY "id" ASC LIMIT 1
)
UPDATE "Product" SET "businessId" = (SELECT "id" FROM default_business) WHERE "businessId" IS NULL;

WITH default_business AS (
  SELECT "id" FROM "Business" WHERE "name" = 'Default Business' ORDER BY "id" ASC LIMIT 1
)
UPDATE "Warehouse" SET "businessId" = (SELECT "id" FROM default_business) WHERE "businessId" IS NULL;

WITH default_business AS (
  SELECT "id" FROM "Business" WHERE "name" = 'Default Business' ORDER BY "id" ASC LIMIT 1
)
INSERT INTO "WorkflowTemplate" ("businessId", "name", "orderType", "isDefault", "isActive", "updatedAt")
SELECT "id", 'Default Supplier PO Flow', 'SUPPLIER_ORDER', true, true, CURRENT_TIMESTAMP
FROM default_business;

WITH default_template AS (
  SELECT "id" FROM "WorkflowTemplate" WHERE "name" = 'Default Supplier PO Flow' ORDER BY "id" ASC LIMIT 1
)
INSERT INTO "WorkflowStage" ("templateId", "name", "position", "isRequired", "updatedAt")
VALUES
  ((SELECT "id" FROM default_template), 'P.O. Placed', 1, true, CURRENT_TIMESTAMP),
  ((SELECT "id" FROM default_template), 'Payment Made', 2, true, CURRENT_TIMESTAMP),
  ((SELECT "id" FROM default_template), 'Order Receipt Made', 3, true, CURRENT_TIMESTAMP),
  ((SELECT "id" FROM default_template), 'Out For Delivery', 4, true, CURRENT_TIMESTAMP),
  ((SELECT "id" FROM default_template), 'Received', 5, true, CURRENT_TIMESTAMP);

WITH default_business AS (
  SELECT "id" FROM "Business" WHERE "name" = 'Default Business' ORDER BY "id" ASC LIMIT 1
),
default_template AS (
  SELECT "id" FROM "WorkflowTemplate" WHERE "name" = 'Default Supplier PO Flow' ORDER BY "id" ASC LIMIT 1
),
first_stage AS (
  SELECT "id" FROM "WorkflowStage" WHERE "templateId" = (SELECT "id" FROM default_template) AND "position" = 1
)
UPDATE "SuppOrder"
SET
  "businessId" = COALESCE("businessId", (SELECT "id" FROM default_business)),
  "workflowTemplateId" = COALESCE("workflowTemplateId", (SELECT "id" FROM default_template)),
  "currentStageId" = COALESCE("currentStageId", (SELECT "id" FROM first_stage)),
  "lifecycleStatus" = CASE WHEN "order_status" = 'RECEIVED' THEN 'COMPLETED'::"OrderLifecycleStatus" ELSE 'OPEN'::"OrderLifecycleStatus" END;

INSERT INTO "SuppOrderStageProgress" ("orderId", "stageId", "status", "startedAt", "completedAt", "updatedAt")
SELECT
  so."id",
  ws."id",
  CASE
    WHEN so."order_status" = 'RECEIVED' THEN 'COMPLETED'::"StageStatus"
    WHEN ws."position" = 1 THEN 'ACTIVE'::"StageStatus"
    ELSE 'PENDING'::"StageStatus"
  END,
  CASE WHEN ws."position" = 1 OR so."order_status" = 'RECEIVED' THEN CURRENT_TIMESTAMP ELSE NULL END,
  CASE WHEN so."order_status" = 'RECEIVED' THEN CURRENT_TIMESTAMP ELSE NULL END,
  CURRENT_TIMESTAMP
FROM "SuppOrder" so
JOIN "WorkflowStage" ws ON ws."templateId" = so."workflowTemplateId";

-- CreateIndex
CREATE INDEX "User_businessId_idx" ON "User"("businessId");
CREATE INDEX "Product_businessId_idx" ON "Product"("businessId");
CREATE INDEX "Warehouse_businessId_idx" ON "Warehouse"("businessId");
CREATE INDEX "SuppOrder_businessId_idx" ON "SuppOrder"("businessId");
CREATE INDEX "SuppOrder_workflowTemplateId_idx" ON "SuppOrder"("workflowTemplateId");
CREATE INDEX "SuppOrder_currentStageId_idx" ON "SuppOrder"("currentStageId");
CREATE INDEX "WorkflowTemplate_businessId_idx" ON "WorkflowTemplate"("businessId");
CREATE INDEX "WorkflowTemplate_orderType_idx" ON "WorkflowTemplate"("orderType");
CREATE UNIQUE INDEX "WorkflowStage_templateId_position_key" ON "WorkflowStage"("templateId", "position");
CREATE INDEX "WorkflowStage_templateId_idx" ON "WorkflowStage"("templateId");
CREATE UNIQUE INDEX "SuppOrderStageProgress_orderId_stageId_key" ON "SuppOrderStageProgress"("orderId", "stageId");
CREATE INDEX "SuppOrderStageProgress_orderId_idx" ON "SuppOrderStageProgress"("orderId");
CREATE INDEX "SuppOrderStageProgress_stageId_idx" ON "SuppOrderStageProgress"("stageId");
CREATE INDEX "SuppOrderStageProgress_status_idx" ON "SuppOrderStageProgress"("status");
CREATE UNIQUE INDEX "OrderFieldDefinition_businessId_key_key" ON "OrderFieldDefinition"("businessId", "key");
CREATE INDEX "OrderFieldDefinition_businessId_idx" ON "OrderFieldDefinition"("businessId");
CREATE INDEX "OrderFieldDefinition_templateId_idx" ON "OrderFieldDefinition"("templateId");
CREATE UNIQUE INDEX "SuppOrderFieldValue_orderId_fieldId_key" ON "SuppOrderFieldValue"("orderId", "fieldId");
CREATE INDEX "SuppOrderFieldValue_orderId_idx" ON "SuppOrderFieldValue"("orderId");
CREATE INDEX "SuppOrderFieldValue_fieldId_idx" ON "SuppOrderFieldValue"("fieldId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Product" ADD CONSTRAINT "Product_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Warehouse" ADD CONSTRAINT "Warehouse_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "SuppOrder" ADD CONSTRAINT "SuppOrder_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "SuppOrder" ADD CONSTRAINT "SuppOrder_workflowTemplateId_fkey" FOREIGN KEY ("workflowTemplateId") REFERENCES "WorkflowTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "SuppOrder" ADD CONSTRAINT "SuppOrder_currentStageId_fkey" FOREIGN KEY ("currentStageId") REFERENCES "WorkflowStage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "WorkflowTemplate" ADD CONSTRAINT "WorkflowTemplate_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "WorkflowStage" ADD CONSTRAINT "WorkflowStage_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "WorkflowTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SuppOrderStageProgress" ADD CONSTRAINT "SuppOrderStageProgress_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "SuppOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SuppOrderStageProgress" ADD CONSTRAINT "SuppOrderStageProgress_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "WorkflowStage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "OrderFieldDefinition" ADD CONSTRAINT "OrderFieldDefinition_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "OrderFieldDefinition" ADD CONSTRAINT "OrderFieldDefinition_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "WorkflowTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SuppOrderFieldValue" ADD CONSTRAINT "SuppOrderFieldValue_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "SuppOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SuppOrderFieldValue" ADD CONSTRAINT "SuppOrderFieldValue_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "OrderFieldDefinition"("id") ON DELETE CASCADE ON UPDATE CASCADE;
