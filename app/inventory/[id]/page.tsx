"use client";
import { useParams } from "next/navigation";
import InventoryTable from "@/components/Inventory/Inventorytable";
import { Product } from "@prisma/client";
import { useEffect, useState } from "react";
import LayoutWithSidebar from "@/app/layotuwithsidebar";
import AddProducts from "@/components/addProducts";
import { useSession } from "next-auth/react";
import { getWarehouseProducts } from "@/services/warehouseService";


type ProductWithInventory = Product & {
  min_stock: number;
  quantity: number;
  expiry: Date | null;
};

export default function WarehouseInventoryPage() {
  const { id } = useParams();
  const [products, setProducts] = useState<ProductWithInventory[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading,setLoading] = useState<boolean>(true);
  const {data:session,status} = useSession();
 
  useEffect(()=>{
      if (!session?.user?.id || !session.user.role) {
        return;
      }

      const getProducts = async () => {
        try {
          const data = await getWarehouseProducts(id as string);
          setProducts(data);
        } catch (err) {
            console.log("Error While fetching Products",err)
        }finally{
            setLoading(false);
        }
      }
      getProducts()
    }
  ,[session?.user?.id, session?.user?.role, id])
  return (
    <LayoutWithSidebar>
      <main className="flex-1 p-4 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Inventory</h2>
          <AddProducts id={id} setProducts={setProducts} products={products}/>
        </div>
        {/*Inventory table is here*/}

        <InventoryTable products={products} page={page} warehouseId={id as string}/>
      </main>
    </LayoutWithSidebar>
  );
}
