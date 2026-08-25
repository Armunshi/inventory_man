import db from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getSessionUser, handleApiError, requireRole } from "@/lib/session";

export async function GET(req: NextRequest): Promise<NextResponse> {
    try {
        const user = await getSessionUser();
        requireRole(user, ["ADMIN"]);

        const search = req.nextUrl.searchParams.get("search") ?? "";

        const managers = await db.user.findMany({
            where: {
                role: "WAREHOUSE_MANAGER",
                name: { contains: search, mode: "insensitive" },
                businessId: user.businessId ?? undefined,
            },
            select: { id: true, name: true, email: true, contact: true },
            take: 10,
        });

        // BigInt isn't JSON-serializable — stringify it before responding.
        const data = managers.map((manager) => ({
            ...manager,
            contact: manager.contact != null ? manager.contact.toString() : null,
        }));

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return handleApiError(error);
    }
}
