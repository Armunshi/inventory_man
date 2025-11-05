import db from "@/prisma/prisma";
import { Product } from "@prisma/client";
import { Params } from "next/dist/server/request/params";
import { NextRequest, NextResponse } from "next/server";
import { number } from "zod";

type ProductWithInventory = Product & {
  min_stock: number;
  quantity: number;
  expiry: Date | null;
};


export async function GET(request: NextRequest, { params }: { params: Params }): Promise<Response> {
    const warehouseidParam = params.id
    if (!warehouseidParam) {
        throw new Error("Warehouse ID not provided");
    }

    const warehouseid = Array.isArray(warehouseidParam)
        ? parseInt(warehouseidParam[0], 10)
        : parseInt(warehouseidParam, 10);
    const searchParams = request.nextUrl.searchParams;
    console.log(searchParams)
    const userid = searchParams.get('id')
    const role = searchParams.get('role');
    const page = Number(searchParams.get('page') || 1);
    if (!userid || !role || !page) {
        return NextResponse.json(
            { message: "There was no role or id data " },
            { status: 404 }
        )
    }
    if (!warehouseid) {
        if (role == 'ADMIN' || role == 'WAREHOUSE_MANAGER') {
            return NextResponse.json(
                { message: "There was no warehouse if for this role data " },
                { status: 404 }
            )
        }
    }
    let products:ProductWithInventory[] = [];
    try {
        if (role == 'ADMIN') {
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
        }

        // if (role == 'SUPPLIER') {
        //     products = await db.product.findMany(
        //         {
        //             where: {
        //                 supplierId: parseInt(userid)
        //             }
        //         }
        //     )
        // }

        return NextResponse.json(products, { status: 200 })
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json(
            { message: "Error fetching products" },
            { status: 500 });
    }
}