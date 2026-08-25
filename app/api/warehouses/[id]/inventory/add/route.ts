import db from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getSessionUser, handleApiError, requireRole } from "@/lib/session";
import { addInventorySchema } from "@/lib/validations";


export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
    try {
        const user = await getSessionUser();
        requireRole(user, ["ADMIN", "WAREHOUSE_MANAGER"]);

        const { id: warehouseidParam } = await params;

        if (!warehouseidParam) {
            return NextResponse.json({ error: "Warehouse ID not provided" }, { status: 400 });
        }

        const body = await req.json();
        const parsed = addInventorySchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { error: parsed.error.issues[0]?.message ?? "Invalid product data" },
                { status: 400 }
            );
        }
        const {
            name,
            category,
            imageUrl,
            description,
            cost_price,
            selling_price,
            batch_size,
            supplierId,
            min_stock,
            expiry,
            quantity
        } = parsed.data;

        const warehouseId = Array.isArray(warehouseidParam)
            ? parseInt(warehouseidParam[0], 10)
            : parseInt(warehouseidParam, 10);

        const product = await db.product.create({
            data: {
                name,
                category,
                imageUrl,
                description,
                cost_price,
                selling_price,
                batch_size,
                supplierId,
            }
        })
        const inventory_entry = await db.inventory.create({
            data: {
                warehouseId,
                productId: product.id,
                min_stock: Number(min_stock) || 0,
                expiry: expiry ? new Date(expiry) : null,
                quantity: Number(quantity) || 0,
            }
        })

        return NextResponse.json(
            {
                message: "Product and inventory created successfully",
                product,
                inventory_entry,
            },
            { status: 201 }
        );
    } catch (error) {
        return handleApiError(error);
    }
}
