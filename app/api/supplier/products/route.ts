import db from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
    const supplierId = req.nextUrl.searchParams.get("supplierId");

    const products = await db.product.findMany({
        where: supplierId ? { supplierId: Number(supplierId) } : undefined,
        orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ products });
}
