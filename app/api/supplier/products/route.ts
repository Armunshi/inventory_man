import db from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getSessionUser, handleApiError } from "@/lib/session";

export async function GET(req: NextRequest): Promise<NextResponse> {
    try {
        await getSessionUser();
        const supplierId = req.nextUrl.searchParams.get("supplierId");

        const products = await db.product.findMany({
            where: supplierId ? { supplierId: Number(supplierId) } : undefined,
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({ products });
    } catch (error) {
        return handleApiError(error);
    }
}
