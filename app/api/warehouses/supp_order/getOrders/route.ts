import { NextResponse } from "next/server";
import db from "@/prisma/prisma";
import { ensureSupplierWorkflow } from "@/lib/orderflow";
import { getSessionUser, handleApiError } from "@/lib/session";

export async function GET(req: Request) {
  try {
    await getSessionUser();
    const { searchParams } = new URL(req.url);
    const warehouseId = parseInt(searchParams.get("warehouseId") || "0");

    if (!warehouseId) {
      return NextResponse.json({ error: "Missing warehouseId" }, { status: 400 });
    }

    const warehouse = await db.warehouse.findUnique({
      where: { id: warehouseId },
      select: { businessId: true },
    });
    await ensureSupplierWorkflow(warehouse?.businessId);

    const suppOrders = await db.suppOrder.findMany({
      where: { warehouseId },
      include: {
        supplier: { select: { id: true, name: true, email: true } },
        workflowTemplate: {
          include: {
            stages: { orderBy: { position: "asc" } },
            fieldDefinitions: { orderBy: { id: "asc" } },
          },
        },
        currentStage: true,
        stageProgress: {
          include: { stage: true },
        },
        customFieldValues: {
          include: { field: true },
          orderBy: { id: "asc" },
        },
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    const data = suppOrders.map((order) => ({
      ...order,
      stageProgress: [...order.stageProgress].sort(
        (a, b) => a.stage.position - b.stage.position
      ),
    }));

    return NextResponse.json({ data });
  } catch (error) {
    return handleApiError(error);
  }
}
