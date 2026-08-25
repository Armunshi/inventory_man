import { NextResponse } from "next/server";
import db from "@/prisma/prisma";
import {
  buildCustomFieldCreates,
  getSupplierWorkflow,
  type CustomFieldInput,
} from "@/lib/orderflow";
import { getSessionUser, handleApiError, requireRole } from "@/lib/session";
import { createSuppOrderSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const user = await getSessionUser();
    requireRole(user, ["ADMIN", "WAREHOUSE_MANAGER"]);

    const requestUrl = new URL(req.url);
    const body = await req.json();
    if (body.warehouseId == null) {
      body.warehouseId = requestUrl.searchParams.get("warehouseId");
    }

    const parsed = createSuppOrderSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid supplier order data" },
        { status: 400 }
      );
    }
    const { warehouseId, supplierId, order_date, items, workflowTemplateId, customFields } = parsed.data;

    // calculate total
    const totalAmount = items.reduce((sum: number, item) => {
      return sum + item.unit_price * item.quantity;
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
          create: buildCustomFieldCreates(customFields as CustomFieldInput | undefined, workflow.fieldDefinitions),
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
    return handleApiError(error);
  }
}
