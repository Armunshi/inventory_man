-- CreateTable
CREATE TABLE "public"."Supplier" (
    "supp_id" SERIAL NOT NULL,
    "supp_name" VARCHAR(30),
    "contact_no" INTEGER,
    "email" VARCHAR(30),
    "supp_address" VARCHAR(30),

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("supp_id")
);

-- CreateTable
CREATE TABLE "public"."Products" (
    "prod_id" SERIAL NOT NULL,
    "name" VARCHAR(30),
    "category" VARCHAR(30),
    "cost_price" DECIMAL(10,2),
    "selling_price" VARCHAR(30),
    "batches_present" INTEGER,
    "batch_size" INTEGER,
    "min_stock" INTEGER,
    "expiry" DATE,
    "supp_id" INTEGER,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("prod_id")
);

-- CreateTable
CREATE TABLE "public"."Retailer" (
    "r_id" SERIAL NOT NULL,
    "name" VARCHAR(20),
    "address" VARCHAR(40),
    "contact" INTEGER,
    "email" VARCHAR(30),

    CONSTRAINT "Retailer_pkey" PRIMARY KEY ("r_id")
);

-- CreateTable
CREATE TABLE "public"."Retailer_Orders" (
    "r_id" INTEGER NOT NULL,
    "prod_id" INTEGER NOT NULL,
    "order_date" DATE,
    "total_amount" DECIMAL(10,2),
    "order_status" VARCHAR(30),
    "transaction_type" VARCHAR(30),
    "batches_bought" INTEGER,

    CONSTRAINT "Retailer_Orders_pkey" PRIMARY KEY ("r_id","prod_id")
);

-- CreateTable
CREATE TABLE "public"."Supp_Orders" (
    "supp_id" INTEGER NOT NULL,
    "prod_id" INTEGER NOT NULL,
    "order_date" DATE,
    "unit_price" DECIMAL(10,2),
    "order_status" VARCHAR(30),
    "batches_size" INTEGER,

    CONSTRAINT "Supp_Orders_pkey" PRIMARY KEY ("supp_id","prod_id")
);

-- AddForeignKey
ALTER TABLE "public"."Products" ADD CONSTRAINT "Products_supp_id_fkey" FOREIGN KEY ("supp_id") REFERENCES "public"."Supplier"("supp_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Retailer_Orders" ADD CONSTRAINT "Retailer_Orders_r_id_fkey" FOREIGN KEY ("r_id") REFERENCES "public"."Retailer"("r_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Retailer_Orders" ADD CONSTRAINT "Retailer_Orders_prod_id_fkey" FOREIGN KEY ("prod_id") REFERENCES "public"."Products"("prod_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Supp_Orders" ADD CONSTRAINT "Supp_Orders_supp_id_fkey" FOREIGN KEY ("supp_id") REFERENCES "public"."Supplier"("supp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Supp_Orders" ADD CONSTRAINT "Supp_Orders_prod_id_fkey" FOREIGN KEY ("prod_id") REFERENCES "public"."Products"("prod_id") ON DELETE RESTRICT ON UPDATE CASCADE;
