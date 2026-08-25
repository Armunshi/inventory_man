"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import LayoutWithSidebar from "@/app/layotuwithsidebar";
import OrdersTable from "@/components/Orders/OrdersTable";
import type { SupplierOrder } from "@/types";

export default function SupplierPortalOrdersPage() {
    const { data: session, status } = useSession();
    const [orders, setOrders] = useState<SupplierOrder[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (session?.user?.role !== "SUPPLIER") return;

        fetch("/api/warehouses/supp_order/getOrders")
            .then((res) => res.json())
            .then((data) => setOrders(data.data ?? []))
            .catch((err) => console.error("Error fetching supplier orders", err))
            .finally(() => setLoading(false));
    }, [session?.user?.role]);

    if (status === "loading") return <div className="p-6">Loading...</div>;
    if (!session) return <div className="p-6">Please log in.</div>;
    if (session.user?.role !== "SUPPLIER") {
        return (
            <LayoutWithSidebar>
                <main className="p-6">This page is only available to supplier accounts.</main>
            </LayoutWithSidebar>
        );
    }
    if (loading) return <LayoutWithSidebar><main className="p-6">Loading your orders...</main></LayoutWithSidebar>;

    return (
        <LayoutWithSidebar>
            <main className="p-6">
                <OrdersTable role="SUPPLIER" orders={orders} viewerRole="SUPPLIER" />
            </main>
        </LayoutWithSidebar>
    );
}
