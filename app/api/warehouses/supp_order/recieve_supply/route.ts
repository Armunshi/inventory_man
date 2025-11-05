import { NextResponse } from "next/server";
import db from "@/prisma/prisma";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const warehouseId = parseInt(params.id);
    const body = await req.json();
    const { orderId } = body;

    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }

    // Find the order and its items
    const order = await db.suppOrder.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Update inventory for each product
    for (const item of order.items) {
      await db.inventory.upsert({
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

    // Mark order as RECEIVED
    const updatedOrder = await db.suppOrder.update({
      where: { id: orderId },
      data: { order_status: "RECEIVED" },
    });

    return NextResponse.json({ success: true, updatedOrder });
  } catch (error) {
    console.error("Error receiving supply:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
