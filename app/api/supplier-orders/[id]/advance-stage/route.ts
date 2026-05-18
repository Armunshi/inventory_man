import { NextResponse } from "next/server";
import db from "@/prisma/prisma";

export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const orderId = Number(id);

    if (!orderId) {
      return NextResponse.json({ error: "Missing order id" }, { status: 400 });
    }

    const order = await db.suppOrder.findUnique({
      where: { id: orderId },
      include: {
        currentStage: true,
        stageProgress: {
          include: { stage: true },
        },
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const progress = [...order.stageProgress].sort(
      (a, b) => a.stage.position - b.stage.position
    );
    const activeProgress =
      progress.find((item) => item.status === "ACTIVE") ??
      progress.find((item) => item.stageId === order.currentStageId);

    if (!activeProgress) {
      return NextResponse.json({ error: "No active stage found" }, { status: 409 });
    }

    const nextProgress = progress.find(
      (item) => item.stage.position > activeProgress.stage.position
    );

    await db.$transaction(async (tx) => {
      await tx.suppOrderStageProgress.update({
        where: { id: activeProgress.id },
        data: {
          status: "COMPLETED",
          completedAt: new Date(),
        },
      });

      if (nextProgress) {
        await tx.suppOrderStageProgress.update({
          where: { id: nextProgress.id },
          data: {
            status: "ACTIVE",
            startedAt: new Date(),
          },
        });

        await tx.suppOrder.update({
          where: { id: order.id },
          data: {
            currentStageId: nextProgress.stageId,
            order_status: nextProgress.stage.name,
            lifecycleStatus: "OPEN",
          },
        });
      } else {
        await tx.suppOrder.update({
          where: { id: order.id },
          data: {
            currentStageId: activeProgress.stageId,
            order_status: activeProgress.stage.name,
            lifecycleStatus: "COMPLETED",
          },
        });
      }
    });

    const updatedOrder = await db.suppOrder.findUnique({
      where: { id: orderId },
      include: {
        supplier: { select: { id: true, name: true, email: true } },
        workflowTemplate: {
          include: {
            stages: { orderBy: { position: "asc" } },
            fieldDefinitions: { orderBy: { id: "asc" } },
          },
        },
        currentStage: true,
        stageProgress: { include: { stage: true } },
        customFieldValues: { include: { field: true } },
        items: { include: { product: true } },
      },
    });

    return NextResponse.json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error("Error advancing supplier order stage:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
