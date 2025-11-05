import { Params } from "next/dist/server/request/params";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,params:{params:Params}):Promise<NextResponse> {
    const searchParams = params.params
    
}