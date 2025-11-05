"use client";
import { useEffect, useState } from "react";
import LayoutWithSidebar from "@/app/layotuwithsidebar";
import OrdersTable from "@/components/Orders/OrdersTable";
import { useWarehouse } from "@/hooks/useWarehouse";
import { RetailerOrder, SupplierOrder } from "@/types";

export default function RetailerOrdersPage() {
  const [orders, setOrders] = useState<RetailerOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const { warehouses } = useWarehouse();

  useEffect(() => {
    async function fetchOrders() {
      if (!warehouses || warehouses.length === 0) return; // safety

      try {
        const results = await Promise.all(
          warehouses.map(async (warehouse) => {
            const params = new URLSearchParams({ warehouseId: warehouse.id.toString() });

            const res = await fetch(`/api/warehouses/retailer_order/getOrders?warehouseId=${warehouse.id}`);
            const data = await res.json();
            console.log(data.orders)
            return data.orders as RetailerOrder[];
          })
        );

        // flatten multiple warehouse result arrays
        setOrders(results.flat());
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [warehouses]); // ✅ only run when warehouse data is ready

  if (loading) return <div className="p-6">Loading retailer orders...</div>;

  return (
    <LayoutWithSidebar>
      <main className="p-6">
        <OrdersTable role="RETAILER" orders={orders} />
      </main>
    </LayoutWithSidebar>
  );
}
