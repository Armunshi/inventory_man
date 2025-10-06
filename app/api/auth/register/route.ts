import NextAuth from "next-auth";

import { hash } from "bcryptjs";
import { error } from "node:console";
import db from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function POST( request:Request):Promise<Response>{
    try {
        const {Name,email,password,role,contact,address} = await request.json();

        if (!Name ||!email ||! role){
            console.log(Name,email,role)
            return NextResponse.json({error:"Credentials are missing or Null "},{status:404});

        }
        
        const hashedpassword =await hash(password,10);
        const user = await db.user.create({
            data:{
                name:Name,
                email,
                password:hashedpassword,
                role,
                contact:contact||null,
                address:address||null
            }
        });
        if (!user){
            return NextResponse.json(
                {error:"user Was not created"},
                {status:500}
            )
        }
        return NextResponse.json({
            message:"User created Succesfully",
            user
        },
        {status:201}
        )
    } catch (err) {
        return NextResponse.json(
            {error:(err as Error).message},
            {status:500}
        )
    }
}