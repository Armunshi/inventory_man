import db from "@/prisma/prisma";
import { Product } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getSessionUser, handleApiError, requireRole } from "@/lib/session";

type ProductWithInventory = Product & {
  min_stock: number;
  quantity: number;
  expiry: Date | null;
};


export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<Response> {
    const { id: warehouseidParam } = await params;
    if (!warehouseidParam) {
        return NextResponse.json({ message: "Warehouse ID not provided" }, { status: 400 });
    }

    const warehouseid = Array.isArray(warehouseidParam)
        ? parseInt(warehouseidParam[0], 10)
        : parseInt(warehouseidParam, 10);

    let products: ProductWithInventory[] = [];
    try {
        const user = await getSessionUser();

        if (user.role === 'ADMIN' || user.role === 'WAREHOUSE_MANAGER') {
            const incompleteproducts = await db.inventory.findMany({
                where: { warehouseId: warehouseid },
                include: {
                    product: true, // 👈 include the entire product info
                },
            });
            products = incompleteproducts.map(({ min_stock, quantity, expiry, product }) => ({
                ...product,   // all product fields
                min_stock,
                quantity,
                expiry,
            }));
        } else if (user.role === 'SUPPLIER') {
            // A supplier only sees this warehouse's stock for products they supply.
            const incompleteproducts = await db.inventory.findMany({
                where: { warehouseId: warehouseid, product: { supplierId: user.id } },
                include: { product: true },
            });
            products = incompleteproducts.map(({ min_stock, quantity, expiry, product }) => ({
                ...product,
                min_stock,
                quantity,
                expiry,
            }));
        } else {
            // RETAILER: catalog-style view only — no internal min_stock exposure.
            requireRole(user, ["RETAILER"]);
            const incompleteproducts = await db.inventory.findMany({
                where: { warehouseId: warehouseid },
                include: { product: true },
            });
            products = incompleteproducts.map(({ quantity, expiry, product }) => ({
                ...product,
                min_stock: 0,
                quantity,
                expiry,
            }));
        }

        return NextResponse.json(products, { status: 200 })
    } catch (error) {
        return handleApiError(error);
    }
}
