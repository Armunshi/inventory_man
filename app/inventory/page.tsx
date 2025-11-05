"use client"
import { Button } from "@/components/ui/button";
import LayoutWithSidebar from "../layotuwithsidebar";
import InventoryTable from "@/components/Inventory/Inventorytable"; // your inventory component
import { useSession } from "next-auth/react";
import { useState } from "react";
// import { Products } from "../generated/prisma";
import { Product } from "@prisma/client";
import { useWarehouse } from "@/hooks/useWarehouse";
import WarehouseCard from "@/components/Inventory/Warehouse";
import AddWarehouse from "@/components/addWarehouse";
import { WarehouseClient } from "@/types";
import { useRouter } from "next/navigation";

export default function InventoryPage() { 
  
  const { data: session, status } = useSession();
  const { warehouses, loading ,setWarehouses} = useWarehouse()
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Please Log In</div>;
  }


  return (
    <LayoutWithSidebar>
      <main className="flex-1 p-6 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Inventory</h2>
          <AddWarehouse warehouses={warehouses} loading={loading} setWarehouses={setWarehouses}/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {
          (warehouses.map(({ id, managerId, ...safewarehouse }) => {
            return (
              <WarehouseCard key={id}
               {...safewarehouse}
               onClick={()=>router.push(`/inventory/${id}`)}
               />
            )
          }))
          }
        </div>
        {/*Inventory table is here*/}

        {/* <InventoryTable products={products} page={page}/> */}
      </main>
    </LayoutWithSidebar>
  );
}