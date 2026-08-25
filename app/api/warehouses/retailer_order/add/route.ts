import { NextResponse } from "next/server";
import db from "@/prisma/prisma";
import { getSessionUser, handleApiError, requireRole } from "@/lib/session";
import { createRetailerOrderSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const user = await getSessionUser();
    requireRole(user, ["RETAILER"]);

    const body = await req.json();
    const parsed = createRetailerOrderSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid order data" },
        { status: 400 }
      );
    }
    const { warehouseId, items } = parsed.data;

    const totalAmount = items.reduce((sum, item) => sum + item.unit_price * item.quantity, 0);

    const order = await db.order.create({
      data: {
        // retailerId always comes from the verified session, never the client.
        retailerId: user.id,
        warehouseId,
        order_status: "PENDING",
        total_amount: totalAmount,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            unit_price: item.unit_price,
          })),
        },
      },
      include: {
        items: { include: { product: true } },
        retailer: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    return handleApiError(error);
  }
}
