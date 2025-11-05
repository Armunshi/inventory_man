import db from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req:NextRequest):Promise<NextResponse>{
    try {
        const {ids} = await req.json();
        const result = await db.product.deleteMany({
            where:{
                id:{
                    in:ids
                }
            }
        })
        return NextResponse.json({success:true,count:result.count});
    } catch (error) {
        console.log("Delete Error",error)
        return NextResponse.json({error:'Failed to delete products'},
            {status:500}
        )
    }
}