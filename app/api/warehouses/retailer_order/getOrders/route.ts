import { NextResponse } from "next/server";
import db from "@/prisma/prisma";
import { getSessionUser, handleApiError } from "@/lib/session";

export async function GET(_: Request) {
  try {
    await getSessionUser();
    const { searchParams } = new URL(_.url);
    const warehouseId = parseInt(searchParams.get("warehouseId") || "0");

    const retailerOrders = await db.order.findMany({
      where: { warehouseId },
      include: {
        retailer: { select: { id: true, name: true, email: true } },
        items: {
          include: {
            product: { select: { id: true, name: true, category: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ orders: retailerOrders });
  } catch (error) {
    return handleApiError(error);
  }
}
