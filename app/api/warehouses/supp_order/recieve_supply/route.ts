import { NextResponse } from "next/server";
import db from "@/prisma/prisma";
import { getSessionUser, handleApiError, requireRole } from "@/lib/session";

export async function POST(req: Request) {
  try {
    const user = await getSessionUser();
    requireRole(user, ["ADMIN", "WAREHOUSE_MANAGER"]);

    const requestUrl = new URL(req.url);
    const body = await req.json();
    const { orderId } = body;
    const warehouseId = Number(body.warehouseId ?? requestUrl.searchParams.get("warehouseId"));

    if (!orderId || !warehouseId) {
      return NextResponse.json({ error: "Missing orderId or warehouseId" }, { status: 400 });
    }

    // Find the order and its items
    const order = await db.suppOrder.findUnique({
      where: { id: orderId },
      include: {
        items: true,
        stageProgress: {
          include: { stage: true },
        },
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const finalProgress = [...order.stageProgress].sort(
      (a, b) => b.stage.position - a.stage.position
    )[0];

    await db.$transaction(async (tx) => {
      for (const item of order.items) {
        await tx.inventory.upsert({
          where: {
            warehouseId_productId: {
              warehouseId,
              productId: item.productId,
            },
          },
          update: {
            quantity: { increment: item.quantity },
            lastUpdated: new Date(),
          },
          create: {
            warehouseId,
            productId: item.productId,
            quantity: item.quantity,
          },
        });
      }

      if (finalProgress) {
        await tx.suppOrderStageProgress.updateMany({
          where: { orderId },
          data: {
            status: "COMPLETED",
            completedAt: new Date(),
          },
        });
      }

      await tx.suppOrder.update({
        where: { id: orderId },
        data: {
          currentStageId: finalProgress?.stageId,
          order_status: finalProgress?.stage.name ?? "RECEIVED",
          lifecycleStatus: "COMPLETED",
        },
      });
    });

    const updatedOrder = await db.suppOrder.findUnique({
      where: { id: orderId },
      include: {
        currentStage: true,
        stageProgress: { include: { stage: true } },
      },
    });

    return NextResponse.json({ success: true, updatedOrder });
  } catch (error) {
    return handleApiError(error);
  }
}
