import { NextResponse } from "next/server";
import db from "@/prisma/prisma";
import {
  buildCustomFieldCreates,
  getSupplierWorkflow,
  type CustomFieldInput,
} from "@/lib/orderflow";

type SupplierOrderItemInput = {
  productId: number;
  quantity: number;
  unit_price: number;
  batch_size?: number | null;
};

export async function POST(req: Request) {
  try {
    const requestUrl = new URL(req.url);
    const body = await req.json();

    const { supplierId, order_date, items, workflowTemplateId, customFields } = body as {
      warehouseId?: number;
      supplierId?: number;
      order_date?: string;
      items?: SupplierOrderItemInput[];
      workflowTemplateId?: number;
      customFields?: CustomFieldInput;
    }; 
    const warehouseId = Number(body.warehouseId ?? requestUrl.searchParams.get("warehouseId"));
    // items = [{ productId, quantity, unit_price, batch_size }]

    if (!warehouseId || !supplierId || !items?.length) {
      return NextResponse.json({ error: "Missing warehouseId, supplierId, or items" }, { status: 400 });
    }

    // calculate total
    const totalAmount = items.reduce((sum: number, item) => {
      return sum + Number(item.unit_price) * item.quantity;
    }, 0);

    const [warehouse, supplier] = await Promise.all([
      db.warehouse.findUnique({ where: { id: warehouseId }, select: { businessId: true } }),
      db.user.findUnique({ where: { id: supplierId }, select: { businessId: true } }),
    ]);

    const workflow = await getSupplierWorkflow(
      workflowTemplateId,
      warehouse?.businessId ?? supplier?.businessId
    );
    const firstStage = workflow.stages[0];

    const newSuppOrder = await db.suppOrder.create({
      data: {
        businessId: workflow.businessId,
        supplierId,
        warehouseId,
        workflowTemplateId: workflow.id,
        currentStageId: firstStage?.id,
        order_status: firstStage?.name ?? "PENDING",
        lifecycleStatus: "OPEN",
        order_date,
        total_amount: totalAmount,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            unit_price: item.unit_price,
            batch_size: item.batch_size ?? null,
          })),
        },
        stageProgress: {
          create: workflow.stages.map((stage, index) => ({
            stageId: stage.id,
            status: index === 0 ? "ACTIVE" : "PENDING",
            startedAt: index === 0 ? new Date() : null,
          })),
        },
        customFieldValues: {
          create: buildCustomFieldCreates(customFields, workflow.fieldDefinitions),
        },
      },
      include: {
        items: true,
        currentStage: true,
        stageProgress: {
          include: { stage: true },
          orderBy: { stage: { position: "asc" } },
        },
        customFieldValues: { include: { field: true } },
      },
    });

    return NextResponse.json({ success: true, order: newSuppOrder });
  } catch (error) {
    console.error("Error creating SuppOrder:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
