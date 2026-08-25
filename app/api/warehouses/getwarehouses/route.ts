import db from "@/prisma/prisma"
import { NextRequest, NextResponse } from "next/server"
import { getSessionUser, handleApiError } from "@/lib/session"

export async function GET(req:NextRequest): Promise<NextResponse> {
    try {
        const user = await getSessionUser();

        const baseSelect = {
            id: true,
            name: true,
            capacity: true,
            location: true,
            managerId: true,
            manager: {
                select: {
                    name: true,
                }
            },
            inventory: {
                select: {
                    quantity: true,
                    min_stock: true,
                }
            }
        } as const;

        let warehouses;
        if (user.role === 'ADMIN') {
            warehouses = await db.warehouse.findMany({
                select: baseSelect,
                where: user.businessId != null ? { businessId: user.businessId } : undefined,
            });
        } else if (user.role === 'WAREHOUSE_MANAGER') {
            warehouses = await db.warehouse.findMany({
                select: baseSelect,
                where: { managerId: user.id },
            });
        } else {
            // SUPPLIER / RETAILER: business-scoped read access so they can
            // see which warehouses fulfill their orders.
            warehouses = await db.warehouse.findMany({
                select: baseSelect,
                where: user.businessId != null ? { businessId: user.businessId } : undefined,
            });
        }

        //Calculate Stats for each ware house
        const filtered_warehouses = warehouses.map((warehouse)=>
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
        return handleApiError(error);
    }
}