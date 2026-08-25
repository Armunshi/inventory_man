"use client";
import { useCallback, useEffect, useState } from "react";
import LayoutWithSidebar from "@/app/layotuwithsidebar";
import OrdersTable from "@/components/Orders/OrdersTable";
import PlaceSuppOrder from "@/components/placeSuppOrder";
import { useWarehouse } from "@/hooks/useWarehouse";
import { SupplierOrder } from "@/types";

export default function SupplierOrdersPage() {
  const [orders, setOrders] = useState<SupplierOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const { warehouses } = useWarehouse();

  const fetchOrders = useCallback(async () => {
    if (!warehouses || warehouses.length === 0) return; // safety

    try {
      const results = await Promise.all(
        warehouses.map(async (warehouse) => {
          const res = await fetch(`/api/warehouses/supp_order/getOrders?warehouseId=${warehouse.id}`);
          const data = await res.json();

          return data.data as SupplierOrder[];
        })
      );

      // flatten multiple warehouse result arrays
      setOrders(results.flat());
    } finally {
      setLoading(false);
    }
  }, [warehouses]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  if (loading) return <div className="p-6">Loading supplier orders...</div>;

  return (
    <LayoutWithSidebar>
      <main className="p-6 space-y-4">
        <div className="flex justify-end">
          <PlaceSuppOrder warehouses={warehouses} onCreated={() => fetchOrders()} />
        </div>
        <OrdersTable role="SUPPLIER" orders={orders} />
      </main>
    </LayoutWithSidebar>
  );
}
