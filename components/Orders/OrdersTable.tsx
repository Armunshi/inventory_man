"use client";

import {
  ChevronDown,
  ChevronRight,
  Download,
  Upload,
  Search,
  X,
  Package,
  DollarSign,
  User,
  Tag,
  MapPin
} from "lucide-react";
import React, { useMemo, useState } from "react";
import PlaceSuppOrder from "../placeSuppOrder";

import { SupplierOrder, RetailerOrder, OrderProduct } from "@/types";

// ---------- PROPS ----------
type OrdersTableProps =
  | { role: "SUPPLIER"; orders: SupplierOrder[] }
  | { role: "RETAILER"; orders: RetailerOrder[] };

type SortConfig = {
  key: string | null;
  direction: "asc" | "desc";
};

// Convert DB orders to UI-ready orders with product[] instead of items[]
function mapOrdersToUI(
  orders: SupplierOrder[] | RetailerOrder[],
  role: "SUPPLIER" | "RETAILER"
) {
  return (orders ?? []).map(order => ({
    ...order,
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
  const { role, orders: initialOrders } = props;

  // TS correctly infers array type
  const [orders, setOrders] = useState(() =>
    initialOrders?.length ? mapOrdersToUI(initialOrders, role):[]
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [channelFilter, setChannelFilter] = useState("all");
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<OrderProduct | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: "asc" });

  // ---------- HELPERS ----------
  const getCustomerName = (order: SupplierOrder | RetailerOrder) => {
    return "retailer" in order ? order.retailer.name : order.supplier.name;
  };

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "DELIVERED":
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

  // ---------- FILTER + SORT ----------
  const filteredAndSortedOrders = useMemo(() => {
    let filtered = orders.filter((order) => {
      const matchesSearch =
        searchQuery === "" ||
        order.id.toString().includes(searchQuery) ||
        getCustomerName(order).toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        order.order_status.toLowerCase() === statusFilter.toLowerCase();


      return matchesSearch && matchesStatus;
    });

    if (sortConfig.key !== null) {
      const key = sortConfig.key;

      filtered.sort((a: any, b: any) => {
        let aVal = key === "customer" ? getCustomerName(a) : a[key];
        let bVal = key === "customer" ? getCustomerName(b) : b[key];

        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [orders, searchQuery, statusFilter, channelFilter, sortConfig, role]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
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
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>


            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="all">Status</option>
              <option value="PENDING">Pending</option>
              <option value="DELIVERED">Delivered</option>
              <option value="REQUESTED">Requested</option>
            </select>
          </div>
        </div>

        {/* ---- TABLE ---- */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
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
                <th>Customer</th>

                {role === "RETAILER" && <th>Sales Channel</th>}

                <th>Items</th>
                <th>Status</th>
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

                    <td>{getCustomerName(order)}</td>



                    <td>{order.products.length}</td>

                    <td>
                      <span className={`px-2 py-1 rounded ${getStatusColor(order.order_status)}`}>
                        {order.order_status}
                      </span>
                    </td>
                  </tr>

                  {/* Expanded product list */}
                  {expandedRows[order.id] && (
                    <tr>
                      <td colSpan={8} className="bg-gray-50">
                        <div className="p-4 pl-12 space-y-2">
                          {order.products.map((p, idx) => (
                            <div key={idx} className="flex items-center gap-4 p-3 bg-white border rounded-md cursor-pointer"
                              onClick={() => handleProductClick(p)}
                            >
                              <img src={p.imageUrl} className="w-12 h-12 rounded bg-gray-100" />
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

            <img src={selectedProduct.imageUrl} className="w-full h-48 object-cover rounded mb-4" />

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
