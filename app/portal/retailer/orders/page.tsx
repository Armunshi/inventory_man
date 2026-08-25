"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import LayoutWithSidebar from "@/app/layotuwithsidebar";
import OrdersTable from "@/components/Orders/OrdersTable";
import PlaceRetailerOrder from "@/components/placeRetailerOrder";
import { useWarehouse } from "@/hooks/useWarehouse";
import type { RetailerOrder } from "@/types";

export default function RetailerPortalOrdersPage() {
    const { data: session, status } = useSession();
    const { warehouses } = useWarehouse();
    const [orders, setOrders] = useState<RetailerOrder[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = useCallback(() => {
        if (session?.user?.role !== "RETAILER") return;

        fetch("/api/warehouses/retailer_order/getOrders")
            .then((res) => res.json())
            .then((data) => setOrders(data.orders ?? []))
            .catch((err) => console.error("Error fetching retailer orders", err))
            .finally(() => setLoading(false));
    }, [session?.user?.role]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    if (status === "loading") return <div className="p-6">Loading...</div>;
    if (!session) return <div className="p-6">Please log in.</div>;
    if (session.user?.role !== "RETAILER") {
        return (
            <LayoutWithSidebar>
                <main className="p-6">This page is only available to retailer accounts.</main>
            </LayoutWithSidebar>
        );
    }
    if (loading) return <LayoutWithSidebar><main className="p-6">Loading your orders...</main></LayoutWithSidebar>;

    return (
        <LayoutWithSidebar>
            <main className="p-6 space-y-4">
                <div className="flex justify-end">
                    <PlaceRetailerOrder warehouses={warehouses} onCreated={() => fetchOrders()} />
                </div>
                <OrdersTable role="RETAILER" orders={orders} viewerRole="RETAILER" />
            </main>
        </LayoutWithSidebar>
    );
}
