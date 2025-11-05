import { NextResponse } from "next/server";
import db from "@/prisma/prisma";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const warehouseidParam = params.id;
    const warehouseId = Array.isArray(warehouseidParam)
            ? parseInt(warehouseidParam[0], 10)
            : parseInt(warehouseidParam, 10);
    const body = await req.json();

    const { supplierId,order_date, items } = body; 
    // items = [{ productId, quantity, unit_price, batch_size }]

    if (!supplierId || !items?.length) {
      return NextResponse.json({ error: "Missing supplierId or items" }, { status: 400 });
    }

    // calculate total
    const totalAmount = items.reduce((sum: number, item: any) => {
      return sum + Number(item.unit_price) * item.quantity;
    }, 0);

    const newSuppOrder = await db.suppOrder.create({
      data: {
        supplierId,
        warehouseId,
        order_status:"PENDING",
        order_date,
        total_amount: totalAmount,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            unit_price: item.unit_price,
            batch_size: item.batch_size ?? null,
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json({ success: true, order: newSuppOrder });
  } catch (error) {
    console.error("Error creating SuppOrder:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
