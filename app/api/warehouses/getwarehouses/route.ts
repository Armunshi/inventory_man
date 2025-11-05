import db from "@/prisma/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req:NextRequest): Promise<NextResponse> {
    const searchParams = req.nextUrl.searchParams;
    console.log(searchParams)
    const id = searchParams.get('id')
    const role = searchParams.get('role');
    let warehouses;
    try {
        if (role=='ADMIN'){
            warehouses = await db.warehouse.findMany({
                select:{
                    id:true,
                    name:true,
                    capacity:true,
                    location:true,
                    managerId:true,
                    manager:{
                        select:{
                            name:true,
                        }
                    },
                    inventory:{
                        select:{
                            quantity:true,
                            min_stock:true,
                        }
                    }
                }
            }); 
        }
        if (role=='WAREHOUSE_MANAGER'){
            warehouses = await db.warehouse.findMany({
                select:{
                    id:true,
                    name:true,
                    capacity:true,
                    location:true,
                    managerId:true,
                    manager:{
                        select:{
                            name:true,
                        }
                    },
                    inventory:{
                        select:{
                            quantity:true,
                            min_stock:true,
                        }
                    }
                },
                where:{
                    managerId:parseInt(id!)
                }
            })
        }
        //Calculate Stats for each ware house
        const filtered_warehouses = warehouses?.map((warehouse)=>
            {const inventory = warehouse.inventory;
            const totalProducts = inventory.length;
    
            //low and critical
            let lowStockCount = 0;
            let criticalCount = 0;
    
            inventory.forEach(item=>{
                const quantity = item.quantity || 0;
                const min_stock = item.min_stock || 0;
                
                if (quantity<min_stock){
                    criticalCount++;
                }else if (quantity<min_stock+20){
                    lowStockCount++;
                }
            });
    
            const utilizationPercent = warehouse.capacity?Math.round(totalProducts/warehouse.capacity):100;
    
            return {
                id: warehouse.id,
                name: warehouse.name,
                location: warehouse.location,
                capacity: warehouse.capacity,
                managerId: warehouse.managerId,
                managerName: warehouse.manager?.name || 'Unassigned',
                totalProducts,
                lowStockCount,
                criticalCount,
                utilizationPercent
            };
        })
        return NextResponse.json(filtered_warehouses,{status:200})
    
    } catch (error) {
        console.log("An Error occured while fetching warehouses",error);
        return NextResponse.json(
            {message:`An Error occured while fetching warehouses\n${error}`},
            {status:500},
        )
    }
}