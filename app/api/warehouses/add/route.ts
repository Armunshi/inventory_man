import db from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getSessionUser, handleApiError, requireRole } from "@/lib/session";
import { addWarehouseSchema } from "@/lib/validations";

export async function POST(req: NextRequest) {
    try {
        const user = await getSessionUser();
        requireRole(user, ["ADMIN"]);

        const body = await req.json();
        const parsed = addWarehouseSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { error: parsed.error.issues[0]?.message ?? "Invalid warehouse data" },
                { status: 400 }
            );
        }
        const { name, location, capacity, managerId } = parsed.data;

        const warehouse = await db.warehouse.create({
            data: {
                name,
                location,
                capacity,
                managerId: managerId ?? null,
                businessId: user.businessId,
            },
            select: {
                id: true,
                name: true,
                location: true,
                capacity: true,
                managerId: true,
                manager: { select: { name: true } },
            },
        });

        return NextResponse.json(
            {
                id: warehouse.id,
                name: warehouse.name,
                location: warehouse.location,
                capacity: warehouse.capacity,
                managerId: warehouse.managerId,
                managerName: warehouse.manager?.name || "Unassigned",
                totalProducts: 0,
                lowStockCount: 0,
                criticalCount: 0,
                utilizationPercent: 0,
            },
            { status: 201 }
        );
    } catch (error) {
        return handleApiError(error);
    }
}
