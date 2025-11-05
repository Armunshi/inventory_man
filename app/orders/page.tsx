"use-client"
import React from 'react'
import LayoutWithSidebar from '../layotuwithsidebar'
import OrdersTable from '@/components/Orders/OrdersTable'
import SuppOrders from '@/components/Orders/SuppOrders'
import RetailerOrders from '@/components/Orders/RetailerOrders'

export default function Orders ()  {
  return (
    <LayoutWithSidebar>
      <main className="flex-1 p-6 overflow-auto">
        <div className="flex items-center justify-between mb-6">
        <SuppOrders totalOrders={10} pendingOrders={3} completedOrders={7} />
<RetailerOrders totalOrders={8} pendingOrders={2} completedOrders={6} />     
        </div>
      </main>
    </LayoutWithSidebar>
  )
}



