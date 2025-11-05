import { useWarehouse } from '@/hooks/useWarehouse';
import React, { Dispatch, SetStateAction } from 'react'
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog';
import { Plus } from 'lucide-react';
import { WarehouseClient } from '@/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useManager } from '@/hooks/useManager';

const AddWarehouse = (
    {warehouses,loading,setWarehouses}:
    {warehouses:WarehouseClient[],
    loading:boolean,
    setWarehouses:Dispatch<SetStateAction<WarehouseClient[]>>}) => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue
    } = useForm<WarehouseClient>();
    const {
    managerSearch,
    setManagerSearch,
    managerSuggestions,
    showSuggestions,
    setShowSuggestions,
    suggestionsRef,
    handleManagerSelect
    } = useManager(setValue);
    const onSubmit: SubmitHandler<WarehouseClient> = async (data) => {
        try {
            const response = await fetch(`/api/warehouses/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                const newWarehouse = await response.json();
                setWarehouses(prev => [...prev, newWarehouse])
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
                    <DialogTitle>Add Warehouse</DialogTitle>
                    <form onSubmit={handleSubmit(onSubmit)} className="space y-4">
                        <div>
                            <label >WareHouse Name</label>
                            <input
                                {...register("name", { required: true })}
                                className="border p-2 w-full rounded"
                            />
                            {errors.name && <span className="text-red 500">Name is required</span>}

                        </div>
                        <div>
                            <label >Location</label>
                            <input
                                {...register("location", { required: true })}
                                className="border p-2 w-full rounded"
                            />
                            {errors.location && <span className="text-red 500">Location is required</span>}

                        </div>
                        <div>
                            <label >Capacity</label>
                            <input
                                {...register("capacity", { required: true })}
                                className="border p-2 w-full rounded"
                            />
                            {errors.capacity && <span className="text-red 500">Selling Price is required</span>}

                        </div>
                        <div className="relative" ref={suggestionsRef}>
                            <label>Manager Name</label>
                            <input
                                {...register("managerName", { required: true })}
                                className="border p-2 w-full rounded"
                                onChange={(e) => {
                                    setManagerSearch(e.target.value);
                                    setValue('managerName', e.target.value);
                                }}
                                onFocus={() => managerSuggestions.length > 0 && setShowSuggestions(true)}
                                autoComplete="off"
                            />
                            {errors.managerName && <span className="text-red-500">Manager Name is required</span>}

                            {showSuggestions && managerSuggestions.length > 0 && (
                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                                    {managerSuggestions.map((manager) => (
                                        <div
                                            key={manager.id}
                                            className="px-4 py-2 cursor-pointer hover:bg-indigo-50 hover:text-indigo-700 transition-colors border-b last:border-b-0"
                                            onClick={() => handleManagerSelect(manager)}
                                        >
                                            <div className="font-medium">{manager.name}</div>
                                            <div className="text-sm text-gray-500">
                                                {manager.email}
                                                {manager.contact && ` • ${manager.contact}`}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div>
                            <label >managerId</label>
                            <input
                                {...register("managerId", { required: true })}
                                className="border p-2 w-full rounded"
                            />
                            {errors.managerId && <span className="text-red 500">Selling Price is required</span>}

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

export default AddWarehouse