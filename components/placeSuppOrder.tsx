import { Plus } from 'lucide-react'
import React, { Dispatch, SetStateAction } from 'react'
import type { SupplierOrder } from '@/types';

type PlaceSuppOrderProps = {
    orders?: SupplierOrder[];
    loading?: boolean;
    setOrders?: Dispatch<SetStateAction<SupplierOrder[]>>;
};

const PlaceSuppOrder = (
    { orders, loading, setOrders }: PlaceSuppOrderProps
) => {
  
    return (
    <div>
        <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Supplier Order
        </button>
    </div>
  )
}

export default PlaceSuppOrder
