"use client";

import {
  ChevronDown,
  ChevronRight,
  Search,
  X,
  CheckCircle2,
  Clock,
} from "lucide-react";
import React, { useMemo, useState } from "react";

import { SupplierOrder, RetailerOrder, OrderProduct } from "@/types";

// ---------- PROPS ----------
// `role` = which kind of order list this is (staff can view either).
// `viewerRole` = who is actually looking at it — when it's the counterparty
// themselves (SUPPLIER/RETAILER viewing their own orders via the portal),
// the vendor/customer column is redundant and gets hidden.
type OrdersTableProps =
  | { role: "SUPPLIER"; orders: SupplierOrder[]; viewerRole?: "ADMIN" | "WAREHOUSE_MANAGER" | "SUPPLIER" }
  | { role: "RETAILER"; orders: RetailerOrder[]; viewerRole?: "ADMIN" | "WAREHOUSE_MANAGER" | "RETAILER" };

type SortConfig = {
  key: string | null;
  direction: "asc" | "desc";
};

type OrderWithProducts = (SupplierOrder | RetailerOrder) & {
  products: OrderProduct[];
};

// Convert DB orders to UI-ready orders with product[] instead of items[]
function mapOrdersToUI(
  orders: SupplierOrder[] | RetailerOrder[],
  role: "SUPPLIER" | "RETAILER"
) {
  return (orders ?? []).map(order => ({
    ...order,
    ...("stageProgress" in order && order.stageProgress
      ? {
          stageProgress: [...order.stageProgress].sort(
            (a, b) => a.stage.position - b.stage.position
          ),
        }
      : {}),
    products: (order.items ?? []).map(item => ({
      id: item.product?.id ?? 0,
      name: item.product?.name ?? "Unknown",
      imageUrl: item.product?.imageUrl ?? "/placeholder.png",
      pickQty: item.quantity ?? 0,
      binLocation: item.product?.binLocation ?? "-",
      vendor:
        role === "SUPPLIER"
          ? ("supplier" in order ? order.supplier.name : "")
          : ("retailer" in order ? order.retailer.name : ""),
      stockStatus: (item.product?.stockQty ?? 0) < 20 ? "Low" : "On Hand",
      stockQty: item.product?.stockQty ?? 0,
      cost_price: item.product?.cost_price ?? 0,
      selling_price: item.product?.selling_price ?? 0,
      category: item.product?.category ?? "",
      description: item.product?.description ?? "",
      batch_size: item.product?.batch_size ?? 0,
      supplierId: item.product?.supplierId ?? 0
    }))
  }));
}



const OrdersTable = (props: OrdersTableProps) => {
  const { role, orders: initialOrders, viewerRole } = props;
  const isCounterpartyView = viewerRole === "SUPPLIER" || viewerRole === "RETAILER";

  // TS correctly infers array type
  const [orders, setOrders] = useState<OrderWithProducts[]>(() =>
    initialOrders?.length ? mapOrdersToUI(initialOrders, role) : []
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<OrderProduct | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: "asc" });
  const [advancingOrderId, setAdvancingOrderId] = useState<number | null>(null);

  // ---------- HELPERS ----------
  const getCustomerName = (order: SupplierOrder | RetailerOrder | OrderWithProducts) => {
    return "retailer" in order ? order.retailer.name : order.supplier.name;
  };

  const getDisplayStage = (order: OrderWithProducts) => {
    if ("currentStage" in order && order.currentStage?.name) return order.currentStage.name;
    return order.order_status;
  };

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "PENDING":
      case "P.O. PLACED":
        return "bg-yellow-100 text-yellow-700";
      case "DELIVERED":
      case "RECEIVED":
        return "bg-green-100 text-green-700";
      case "REQUESTED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };



  const toggleRow = (orderId: number) => {
    setExpandedRows(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  const handleProductClick = (product: OrderProduct) => {
    setSelectedProduct(product);
    setSidebarOpen(true);
  };

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleAdvanceStage = async (orderId: number) => {
    if (role !== "SUPPLIER") return;

    try {
      setAdvancingOrderId(orderId);
      const response = await fetch(`/api/supplier-orders/${orderId}/advance-stage`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to advance order stage");
      }

      const data = await response.json();
      const updated = mapOrdersToUI([data.order as SupplierOrder], "SUPPLIER")[0];
      setOrders((prev) => prev.map((order) => (order.id === orderId ? updated : order)));
    } catch (error) {
      console.error(error);
      alert("Unable to move this order to the next stage.");
    } finally {
      setAdvancingOrderId(null);
    }
  };

  // ---------- FILTER + SORT ----------
  const filteredAndSortedOrders = useMemo(() => {
    const filtered = orders.filter((order) => {
      const matchesSearch =
        searchQuery === "" ||
        order.id.toString().includes(searchQuery) ||
        getCustomerName(order).toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        order.order_status.toLowerCase() === statusFilter.toLowerCase() ||
        getDisplayStage(order).toLowerCase() === statusFilter.toLowerCase();


      return matchesSearch && matchesStatus;
    });

    if (sortConfig.key !== null) {
      const key = sortConfig.key;

      filtered.sort((a, b) => {
        const aVal = key === "customer" ? getCustomerName(a) : String(a.id);
        const bVal = key === "customer" ? getCustomerName(b) : String(b.id);

        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [orders, searchQuery, statusFilter, sortConfig]);

  const supplierStages = useMemo(() => {
    if (role !== "SUPPLIER") return [];

    const names = new Set<string>();
    orders.forEach((order) => {
      if ("stageProgress" in order) {
        order.stageProgress?.forEach((progress) => names.add(progress.stage.name));
      }
    });
    return Array.from(names);
  }, [orders, role]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-md shadow-sm mb-6 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {role === "SUPPLIER" ? "Supplier Orders" : "Retailer Orders"}
            </h1>

          </div>

          {/* Filters */}
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search Order ID / Customer"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
              />
            </div>


            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="all">Status</option>
              <option value="PENDING">Pending</option>
              <option value="DELIVERED">Delivered</option>
              <option value="REQUESTED">Requested</option>
              {supplierStages.map((stage) => (
                <option key={stage} value={stage}>{stage}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ---- TABLE ---- */}
        <div className="bg-white rounded-md shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3"></th>
                <th
                  className="px-4 py-3 cursor-pointer"
                  onClick={() => handleSort("id")}
                >
                  Order ID
                </th>
                <th>Date</th>
                {!isCounterpartyView && <th>{role === "SUPPLIER" ? "Supplier" : "Customer"}</th>}

                {role === "RETAILER" && <th>Sales Channel</th>}

                <th>Items</th>
                <th>{role === "SUPPLIER" ? "Current Stage" : "Status"}</th>
                {role === "SUPPLIER" && <th>Action</th>}
              </tr>
            </thead>

            <tbody className="divide-y">
              {filteredAndSortedOrders.map((order) => (
                <React.Fragment key={order.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <button onClick={() => toggleRow(order.id)}>
                        {expandedRows[order.id]
                          ? <ChevronDown className="w-4 h-4" />
                          : <ChevronRight className="w-4 h-4" />}
                      </button>
                    </td>

                    <td className="px-4 py-4 text-blue-600 font-medium">
                      #{order.id}
                    </td>

                    <td>{new Date(order.order_date).toLocaleDateString()}</td>

                    {!isCounterpartyView && <td>{getCustomerName(order)}</td>}

                    <td>{order.products.length}</td>

                    <td>
                      <span className={`px-2 py-1 rounded ${getStatusColor(getDisplayStage(order))}`}>
                        {getDisplayStage(order)}
                      </span>
                    </td>
                    {role === "SUPPLIER" && (
                      <td>
                        <button
                          type="button"
                          onClick={() => handleAdvanceStage(order.id)}
                          disabled={
                            advancingOrderId === order.id ||
                            ("lifecycleStatus" in order && order.lifecycleStatus === "COMPLETED")
                          }
                          className="rounded-md border px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-50 disabled:cursor-not-allowed disabled:text-gray-400"
                        >
                          {advancingOrderId === order.id ? "Moving..." : "Move Next"}
                        </button>
                      </td>
                    )}
                  </tr>

                  {/* Expanded product list */}
                  {expandedRows[order.id] && (
                    <tr>
                      <td colSpan={7} className="bg-gray-50">
                        <div className="p-4 pl-12 space-y-2">
                          {role === "SUPPLIER" && "stageProgress" in order && order.stageProgress?.length ? (
                            <div className="mb-4 rounded-md border bg-white p-4">
                              <div className="mb-3 text-sm font-semibold text-gray-900">Order pipeline</div>
                              <div className="grid gap-2 md:grid-cols-5">
                                {order.stageProgress.map((progress) => (
                                  <div
                                    key={progress.id}
                                    className={`rounded-md border p-3 ${
                                      progress.status === "COMPLETED"
                                        ? "border-green-200 bg-green-50"
                                        : progress.status === "ACTIVE"
                                          ? "border-blue-200 bg-blue-50"
                                          : "border-gray-200 bg-gray-50"
                                    }`}
                                  >
                                    <div className="flex items-center gap-2">
                                      {progress.status === "COMPLETED" ? (
                                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                                      ) : (
                                        <Clock className="h-4 w-4 text-gray-500" />
                                      )}
                                      <span className="text-sm font-medium">{progress.stage.name}</span>
                                    </div>
                                    <div className="mt-1 text-xs text-gray-500">{progress.status}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : null}
                          {role === "SUPPLIER" && "customFieldValues" in order && order.customFieldValues?.length ? (
                            <div className="mb-4 rounded-md border bg-white p-4">
                              <div className="mb-2 text-sm font-semibold text-gray-900">Custom details</div>
                              <div className="grid gap-2 md:grid-cols-3">
                                {order.customFieldValues.map((fieldValue) => (
                                  <div key={fieldValue.id}>
                                    <div className="text-xs text-gray-500">{fieldValue.field.name}</div>
                                    <div className="text-sm font-medium">{String(fieldValue.value ?? "-")}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : null}
                          {order.products.map((p, idx) => (
                            <div key={idx} className="flex items-center gap-4 p-3 bg-white border rounded-md cursor-pointer"
                              onClick={() => handleProductClick(p)}
                            >
                              <img src={p.imageUrl} alt={p.name} className="w-12 h-12 rounded bg-gray-100 object-cover" />
                              <div className="flex-1">
                                <p className="font-semibold">{p.name}</p>
                                <p className="text-xs text-gray-500">
                                  PN-{p.id.toString().padStart(6, "0")}
                                </p>
                              </div>
                              <div className="text-sm text-gray-600">{p.pickQty} pcs</div>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PRODUCT SIDEBAR */}
      {sidebarOpen && selectedProduct && (
        <>
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl p-6 overflow-y-auto">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">Product Details</h2>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <img
              src={selectedProduct.imageUrl}
              alt={selectedProduct.name}
              className="w-full h-48 object-cover rounded mb-4"
            />

            <p className="font-semibold text-lg">{selectedProduct.name}</p>
            <p className="text-gray-500 text-sm mb-2">{selectedProduct.description}</p>

            <div className="space-y-2 text-sm">
              <p><b>Vendor:</b> {selectedProduct.vendor}</p>
              <p><b>Batch Size:</b> {selectedProduct.batch_size}</p>
              <p><b>Stock:</b> {selectedProduct.stockQty}</p>
              <p><b>Cost:</b> {selectedProduct.cost_price}</p>
              <p><b>Selling:</b> {selectedProduct.selling_price}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrdersTable;
