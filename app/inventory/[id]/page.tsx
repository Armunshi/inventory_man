"use client";
import { useParams } from "next/navigation";
import InventoryTable from "@/components/Inventory/Inventorytable";
import { Product } from "@prisma/client";
import { useEffect, useState } from "react";
import LayoutWithSidebar from "@/app/layotuwithsidebar";
import AddProducts from "@/components/addProducts";
import { useSession } from "next-auth/react";


type ProductWithInventory = Product & {
  min_stock: number;
  quantity: number;
  expiry: Date | null;
};

export default function WarehouseInventoryPage() {
  const { id } = useParams();
  const [products, setProducts] = useState<ProductWithInventory[]>([]);
  const [page, setPage] = useState<Number>(1);
  const [loading,setLoading] = useState<boolean>(true);
  const {data:session,status} = useSession();
 
  useEffect(()=>{
        console.log("Session:", session); // Add this to debug
      console.log("User ID:", session?.user?.id); // Add this to debug

      if (!session?.user?.id || !session.user.role) {
        console.log("No user ID  or role, returning early"); // Add this
        return;
      }

      console.log("Fetching Products..."); // Add this

      const getProducts =async ()=>{
       const params = new URLSearchParams();
        params.append('id', session.user.id.toString());
        params.append('role', session.user.role!);

        const url = `/api/warehouses/${id}/inventory/getproducts?${params.toString()}`; 
        try {
            const response = await fetch(url,{
                method:"GET",
                headers:{'Content-type':"application/json"},
            })   
            if (response.ok){
                const data = await response.json();
               
                setProducts(data);
            }
        } catch (err) {
            console.log("Error While fetching Products",err)
        }finally{
            setLoading(false);
        }
      }
      getProducts()
    }
  ,[session?.user?.id, session?.user?.role])
  return (
    <LayoutWithSidebar>
      <main className="flex-1 p-6 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Inventory</h2>
          <AddProducts id={id} setProducts={setProducts} products={products}/>
        </div>
        {/*Inventory table is here*/}

        <InventoryTable products={products} page={page}/> 
      </main>
    </LayoutWithSidebar>
  );
}
