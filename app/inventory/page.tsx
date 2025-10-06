"use client"
import { Button } from "@/components/ui/button";
import LayoutWithSidebar from "../layotuwithsidebar";
import InventoryTable from "@/components/Inventory/Inventorytable"; // your inventory component
import { Plus } from "lucide-react";

import { Dialog, DialogClose, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
// import { Products } from "../generated/prisma";
import { Product } from "@prisma/client";
import { useForm, SubmitHandler } from "react-hook-form";

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true)
  const { data: session, status } = useSession();
  const [page,setPage] =useState<Number>(1);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Product>();
  const onSubmit: SubmitHandler<Product> = async (data) => {
    try {
      const response = await fetch(`/api/inventory/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      if (response.ok) {
        const newProduct = await response.json();
        setProducts(prev => [...prev, newProduct])
      }
    } catch (error) {
      console.log("Error While adding product", error)
    }
  }
  useEffect(() => {
    const getProducts = async () => {
      console.log("Session:", session); // Add this to debug
      console.log("User ID:", session?.user?.id); // Add this to debug

      if (!session?.user?.id) {
        console.log("No user ID, returning early"); // Add this
        return;
      }

      console.log("Fetching products..."); // Add this

      try {
        const response = await fetch(`/api/inventory/getproducts?id=${session.user?.id}&role=${session.user?.role}&${page}`, {
          method: "GET",
          headers: { 'Content-Type': "application/json" },
        })
        if (response.ok) {
          const data = await response.json();
          setProducts(data)
        }
      } catch (err) {
        console.log("Error while fetching products", err)
      } finally {
        setLoading(false);
      }
    }
    getProducts()
  }, [session?.user?.id, session?.user?.role])


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
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline"
                  className="bg-indigo-600 hover:bg-indigo-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Add Products</DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)} className="space y-4">
                  <div>
                    <label >Product Name</label>
                    <input
                      {...register("name", { required: true })}
                      className="border p-2 w-full rounded"
                    />
                    {errors.name && <span className="text-red 500">Name is required</span>}

                  </div>
                  <div>
                    <label >Category</label>
                    <input
                      {...register("category", { required: true })}
                      className="border p-2 w-full rounded"
                    />
                    {errors.category && <span className="text-red 500">Category is required</span>}

                  </div>
                  <div>
                    <label >Cost Price</label>
                    <input
                      {...register("cost_price", { required: true })}
                      className="border p-2 w-full rounded"
                    />
                    {errors.cost_price && <span className="text-red 500">Cost_Price is required</span>}

                  </div>
                  <div>
                    <label >Selling Price</label>
                    <input
                      {...register("selling_price", { required: true })}
                      className="border p-2 w-full rounded"
                    />
                    {errors.selling_price && <span className="text-red 500">Selling Price is required</span>}

                  </div>
                  <Button type="submit" className="w-full">
                    Add Product
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
            <Button variant="outline">Import</Button>
          </div>
        </div>
        <InventoryTable products={products} />
      </main>
    </LayoutWithSidebar>
  );
}