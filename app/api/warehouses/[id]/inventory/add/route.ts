import db from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
    try {
        const { id: warehouseidParam } = await params;



        if (!warehouseidParam) {
            throw new Error("Warehouse ID not provided");
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
        } = await req.json()
        if (!name || !supplierId) {
            return NextResponse.json(
                { error: "Missing required fields (name or supplierId)" },
                { status: 400 }
            );
        }
        const warehouseId = Array.isArray(warehouseidParam)
            ? parseInt(warehouseidParam[0], 10)
            : parseInt(warehouseidParam, 10);
        const searchParams = req.nextUrl.searchParams;
        console.log(searchParams)
        const userid = searchParams.get('id')
        const role = searchParams.get('role');

        if (!name || !supplierId) {
            return NextResponse.json(
                { error: "Missing required fields (name or supplierId)" },
                { status: 400 }
            );
        }


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
        console.error("Error creating product/inventory:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Internal Server Error" },
            { status: 500 }
        );
    }
} 
