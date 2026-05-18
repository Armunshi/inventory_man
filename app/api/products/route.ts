import db from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const searchParams = req.nextUrl.searchParams;
    const supplierId = searchParams.get("supplierId");
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const products = await db.product.findMany({
      where: {
        ...(supplierId ? { supplierId: Number(supplierId) } : {}),
        ...(category && category !== "all" ? { category } : {}),
        ...(search
          ? {
              OR: [
                { name: { contains: search, mode: "insensitive" } },
                { category: { contains: search, mode: "insensitive" } },
                { supplier: { name: { contains: search, mode: "insensitive" } } },
              ],
            }
          : {}),
      },
      include: {
        supplier: { select: { id: true, name: true, email: true } },
        inventory: {
          select: {
            quantity: true,
            min_stock: true,
            warehouseId: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const data = products.map((product) => {
      const totalQuantity = product.inventory.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      const lowStockCount = product.inventory.filter(
        (item) => item.quantity >= item.min_stock && item.quantity < item.min_stock + 20
      ).length;
      const criticalStockCount = product.inventory.filter(
        (item) => item.quantity < item.min_stock
      ).length;

      return {
        id: product.id,
        name: product.name,
        category: product.category,
        imageUrl: product.imageUrl,
        description: product.description,
        cost_price: product.cost_price?.toString() ?? null,
        selling_price: product.selling_price?.toString() ?? null,
        batch_size: product.batch_size,
        available_stock: product.available_stock,
        supplier: product.supplier,
        inventorySummary: {
          totalQuantity,
          lowStockCount,
          criticalStockCount,
          warehouseCount: new Set(product.inventory.map((item) => item.warehouseId)).size,
        },
      };
    });

    return NextResponse.json({ products: data });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
