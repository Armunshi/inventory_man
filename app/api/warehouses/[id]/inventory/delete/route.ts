import db from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getSessionUser, handleApiError, requireRole } from "@/lib/session";

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
    try {
        const user = await getSessionUser();
        requireRole(user, ["ADMIN", "WAREHOUSE_MANAGER"]);

        const { id: warehouseIdParam } = await params;
        const warehouseId = parseInt(warehouseIdParam, 10);
        if (!warehouseId) {
            return NextResponse.json({ error: "Warehouse ID not provided" }, { status: 400 });
        }

        const { ids } = await req.json();
        if (!Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json({ error: "No product ids provided" }, { status: 400 });
        }

        // Removing stock from a warehouse only deletes that warehouse's
        // Inventory rows — it must NOT delete the underlying Product, which
        // would cascade and remove it from every other warehouse too.
        const result = await db.inventory.deleteMany({
            where: {
                warehouseId,
                productId: { in: ids },
            },
        });

        return NextResponse.json({ success: true, count: result.count });
    } catch (error) {
        return handleApiError(error);
    }
}
