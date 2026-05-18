import { NextResponse } from "next/server";
import db from "@/prisma/prisma";
import { ensureDefaultBusiness, ensureSupplierWorkflow } from "@/lib/orderflow";
import type { WorkflowOrderType } from "@prisma/client";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const requestedBusinessId = searchParams.get("businessId");
    const orderType = (searchParams.get("type") || "SUPPLIER_ORDER") as WorkflowOrderType;

    const business = requestedBusinessId
      ? await db.business.findUnique({ where: { id: Number(requestedBusinessId) } })
      : await ensureDefaultBusiness();

    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    if (orderType === "SUPPLIER_ORDER") {
      await ensureSupplierWorkflow(business.id);
    }

    const workflows = await db.workflowTemplate.findMany({
      where: {
        businessId: business.id,
        orderType,
        isActive: true,
      },
      include: {
        stages: { orderBy: { position: "asc" } },
        fieldDefinitions: { orderBy: { id: "asc" } },
      },
      orderBy: [{ isDefault: "desc" }, { id: "asc" }],
    });

    return NextResponse.json({ business, workflows });
  } catch (error) {
    console.error("Error fetching workflows:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
