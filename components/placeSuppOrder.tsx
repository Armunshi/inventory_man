import { Order } from '@prisma/client';
import { Plus } from 'lucide-react'
import React from 'react'

const PlaceSuppOrder = (
    {orders,loading,setOrders}:{orders:Supp,loading,setOrders}
) => {
  
    return (
    <div>
        <button 
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Supplier Order
        </button>
    </div>
  )
}

export default PlaceSuppOrder