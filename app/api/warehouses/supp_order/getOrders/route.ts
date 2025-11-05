import { NextResponse } from "next/server";
import db from "@/prisma/prisma";
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const warehouseId = parseInt(searchParams.get("warehouseId") || "0");

    const suppOrders = await db.suppOrder.findMany({
      where: { warehouseId },
      include: {
        supplier: { select: { id: true, name: true, email: true } },
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    return Response.json({ data: suppOrders });
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Server Error" }, { status: 500 });
  }
}

