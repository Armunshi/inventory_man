import { useWarehouse } from '@/hooks/useWarehouse';
import React, { Dispatch, SetStateAction } from 'react'
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog';
import { Plus } from 'lucide-react';
import { WarehouseClient } from '@/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useManager } from '@/hooks/useManager';
import { Product } from '@prisma/client';
import { ParamValue } from 'next/dist/server/request/params';


type ProductWithInventory = Product & {
  min_stock: number;
  quantity: number;
  expiry: Date | null;
};
const AddProducts = ({ products, setProducts, id }: { products: ProductWithInventory[], setProducts: Dispatch<SetStateAction<ProductWithInventory[]>>, id: ParamValue }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue
    } = useForm<Product>();
    const onSubmit: SubmitHandler<Product> = async (data) => {

        try {
            const response = await fetch(`/api/warehouses/${id}/inventory/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                const newProducts = await response.json();
                ((prev: Product[]) => [...prev, newProducts])
            }
        } catch (error) {
            console.log("Error While adding Warehouse", error)
        }
    }
    return (
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
                    <DialogTitle>Add Product</DialogTitle>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Product Name */}
                        <div>
                            <label>Product Name</label>
                            <input
                                {...register("name", { required: true })}
                                className="border p-2 w-full rounded"
                                placeholder="e.g. iPhone 15 Pro"
                            />
                            {errors.name && <span className="text-red-500">Name is required</span>}
                        </div>

                        {/* Category */}
                        <div>
                            <label>Category</label>
                            <input
                                {...register("category")}
                                className="border p-2 w-full rounded"
                                placeholder="e.g. Electronics"
                            />
                        </div>

                        {/* Image URL */}
                        <div>
                            <label>Image URL</label>
                            <input
                                type='image'
                                {...register("imageUrl")}
                                className="border p-2 w-full rounded"
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label>Description</label>
                            <textarea
                                {...register("description")}
                                className="border p-2 w-full rounded"
                                rows={3}
                                placeholder="Short description about the product"
                            />
                        </div>

                        {/* Cost Price */}
                        <div>
                            <label>Cost Price</label>
                            <input
                                type="number"
                                step="0.01"
                                {...register("cost_price", { required: true, valueAsNumber: true })}
                                className="border p-2 w-full rounded"
                                placeholder="Enter cost price"
                            />
                            {errors.cost_price && <span className="text-red-500">Cost price is required</span>}
                        </div>

                        {/* Selling Price */}
                        <div>
                            <label>Selling Price</label>
                            <input
                                type="number"
                                step="0.01"
                                {...register("selling_price", { required: true, valueAsNumber: true })}
                                className="border p-2 w-full rounded"
                                placeholder="Enter selling price"
                            />
                            {errors.selling_price && <span className="text-red-500">Selling price is required</span>}
                        </div>

                        {/* Batch Size */}
                        <div>
                            <label>Batch Size</label>
                            <input
                                type="number"
                                {...register("batch_size", { required: true, valueAsNumber: true })}
                                className="border p-2 w-full rounded"
                                placeholder="e.g. 100"
                            />
                            {errors.batch_size && <span className="text-red-500">Batch size is required</span>}
                        </div>

                        {/* Supplier ID */}
                        <div>
                            <label>Supplier ID</label>
                            <input
                                type="number"
                                {...register("supplierId", { required: true, valueAsNumber: true })}
                                className="border p-2 w-full rounded"
                                placeholder="Enter supplier ID"
                            />
                            {errors.supplierId && <span className="text-red-500">Supplier ID is required</span>}
                        </div>

                        <Button type="submit" className="w-full">
                            Add Product
                        </Button>
                    </form>

                </DialogContent>
            </Dialog>
            <Button variant="outline">Import</Button>
        </div>
    )
}

export default AddProducts