import db from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { number } from "zod";


export async function GET(request: NextRequest): Promise<Response> {
    const searchParams = request.nextUrl.searchParams;
    console.log(searchParams)
    const id = searchParams.get('id')
    const role = searchParams.get('role');
    const page = Number(searchParams.get('page')||1);
    if (!id || !role ||!page) {
        return NextResponse.json(
            { message: "There was no role or id data " },
            { status: 404 }
        )
    }
    let products;
    try {
        if (role == 'ADMIN')
            products = await db.product.findMany({
            take: 50,
            skip: (page - 1) * 50
        });
        if (role == 'SUPPLIER') {
            products = await db.product.findMany(
                {
                    where: {
                        supplierId: parseInt(id)
                    }
                }
            )
        }
        return NextResponse.json(products, { status: 200 })
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json(
            { message: "Error fetching products" },
            { status: 500 });
    }
}