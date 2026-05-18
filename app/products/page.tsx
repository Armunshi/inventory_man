"use client";

import LayoutWithSidebar from "@/app/layotuwithsidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ProductCatalogItem } from "@/types";
import {
  AlertTriangle,
  Boxes,
  Eye,
  Filter,
  Package,
  Search,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type StockFilter = "all" | "healthy" | "low" | "critical" | "out";

const formatMoney = (value: string | null) => {
  if (!value) return "N/A";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(value));
};

const getStockState = (product: ProductCatalogItem): Exclude<StockFilter, "all"> => {
  if (product.inventorySummary.totalQuantity <= 0 && product.available_stock <= 0) return "out";
  if (product.inventorySummary.criticalStockCount > 0) return "critical";
  if (product.inventorySummary.lowStockCount > 0) return "low";
  return "healthy";
};

const stockStyles: Record<Exclude<StockFilter, "all">, string> = {
  healthy: "bg-green-50 text-green-700 border-green-200",
  low: "bg-yellow-50 text-yellow-700 border-yellow-200",
  critical: "bg-red-50 text-red-700 border-red-200",
  out: "bg-gray-100 text-gray-700 border-gray-200",
};

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductCatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState<StockFilter>("all");
  const [selectedProduct, setSelectedProduct] = useState<ProductCatalogItem | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/products");
        if (!response.ok) throw new Error("Unable to fetch products");
        const data = await response.json();
        setProducts(data.products ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    const categorySet = new Set(
      products
        .map((product) => product.category)
        .filter((category): category is string => Boolean(category))
    );
    return Array.from(categorySet).sort((a, b) => a.localeCompare(b));
  }, [products]);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query) ||
        product.supplier.name.toLowerCase().includes(query);

      const matchesCategory =
        categoryFilter === "all" || product.category === categoryFilter;

      const matchesStock =
        stockFilter === "all" || getStockState(product) === stockFilter;

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [products, searchQuery, categoryFilter, stockFilter]);

  const stats = useMemo(() => {
    return {
      total: products.length,
      low: products.filter((product) => getStockState(product) === "low").length,
      critical: products.filter((product) => getStockState(product) === "critical").length,
      out: products.filter((product) => getStockState(product) === "out").length,
    };
  }, [products]);

  return (
    <LayoutWithSidebar>
      <main className="flex-1 overflow-auto bg-gray-50 p-4 lg:p-6">
        <div className="mx-auto max-w-7xl space-y-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
              <p className="mt-1 text-sm text-gray-500">
                Catalog view across suppliers and warehouse inventory.
              </p>
            </div>
            <Button variant="outline" className="w-fit">
              <Package className="h-4 w-4" />
              Catalog
            </Button>
          </div>

          <div className="grid gap-3 md:grid-cols-4">
            <div className="rounded-md border bg-white p-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Boxes className="h-4 w-4" />
                Total Products
              </div>
              <div className="mt-2 text-2xl font-semibold text-gray-900">{stats.total}</div>
            </div>
            <div className="rounded-md border bg-white p-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                Low Stock
              </div>
              <div className="mt-2 text-2xl font-semibold text-yellow-700">{stats.low}</div>
            </div>
            <div className="rounded-md border bg-white p-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                Critical
              </div>
              <div className="mt-2 text-2xl font-semibold text-red-700">{stats.critical}</div>
            </div>
            <div className="rounded-md border bg-white p-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Package className="h-4 w-4 text-gray-600" />
                Out of Stock
              </div>
              <div className="mt-2 text-2xl font-semibold text-gray-900">{stats.out}</div>
            </div>
          </div>

          <div className="rounded-md border bg-white p-4">
            <div className="grid gap-3 lg:grid-cols-[1fr_240px_180px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search by product, category, or supplier"
                  className="pl-9"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <select
                  value={categoryFilter}
                  onChange={(event) => setCategoryFilter(event.target.value)}
                  className="h-9 w-full rounded-md border border-gray-200 bg-white pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <select
                value={stockFilter}
                onChange={(event) => setStockFilter(event.target.value as StockFilter)}
                className="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All stock</option>
                <option value="healthy">Healthy</option>
                <option value="low">Low</option>
                <option value="critical">Critical</option>
                <option value="out">Out of stock</option>
              </select>
            </div>
          </div>

          <div className="overflow-hidden rounded-md border bg-white">
            {loading ? (
              <div className="p-8 text-center text-sm text-gray-500">Loading products...</div>
            ) : error ? (
              <div className="p-8 text-center text-sm text-red-600">{error}</div>
            ) : filteredProducts.length === 0 ? (
              <div className="p-8 text-center text-sm text-gray-500">No products found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[920px] text-sm">
                  <thead className="border-b bg-gray-50 text-left text-xs uppercase text-gray-500">
                    <tr>
                      <th className="px-4 py-3">Product</th>
                      <th className="px-4 py-3">Category</th>
                      <th className="px-4 py-3">Supplier</th>
                      <th className="px-4 py-3">Stock</th>
                      <th className="px-4 py-3">Price</th>
                      <th className="px-4 py-3">Batch</th>
                      <th className="px-4 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredProducts.map((product) => {
                      const stockState = getStockState(product);
                      return (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md border bg-gray-100">
                                {product.imageUrl ? (
                                  <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <div className="flex h-full w-full items-center justify-center">
                                    <Package className="h-5 w-5 text-gray-400" />
                                  </div>
                                )}
                              </div>
                              <div className="min-w-0">
                                <div className="max-w-[260px] truncate font-medium text-gray-900">
                                  {product.name}
                                </div>
                                <div className="text-xs text-gray-500">PR-{product.id.toString().padStart(6, "0")}</div>
                              </div>
                            </div>
                          </td>
                          <td className="max-w-[220px] truncate px-4 py-3 text-gray-600">
                            {product.category ?? "Uncategorized"}
                          </td>
                          <td className="px-4 py-3 text-gray-600">{product.supplier.name}</td>
                          <td className="px-4 py-3">
                            <div className={`inline-flex rounded-md border px-2 py-1 text-xs font-medium ${stockStyles[stockState]}`}>
                              {stockState.replace("-", " ")}
                            </div>
                            <div className="mt-1 text-xs text-gray-500">
                              {product.inventorySummary.totalQuantity} units in {product.inventorySummary.warehouseCount} warehouse(s)
                            </div>
                          </td>
                          <td className="px-4 py-3 text-gray-700">{formatMoney(product.selling_price)}</td>
                          <td className="px-4 py-3 text-gray-700">{product.batch_size ?? "N/A"}</td>
                          <td className="px-4 py-3 text-right">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedProduct(product)}
                            >
                              <Eye className="h-4 w-4" />
                              View
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {selectedProduct && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/40"
              onClick={() => setSelectedProduct(null)}
            />
            <aside className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto bg-white p-6 shadow-xl">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Product details</h2>
                  <p className="mt-1 text-sm text-gray-500">PR-{selectedProduct.id.toString().padStart(6, "0")}</p>
                </div>
                <button
                  type="button"
                  className="rounded-md p-2 hover:bg-gray-100"
                  onClick={() => setSelectedProduct(null)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mb-5 aspect-video overflow-hidden rounded-md border bg-gray-100">
                {selectedProduct.imageUrl ? (
                  <img
                    src={selectedProduct.imageUrl}
                    alt={selectedProduct.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Package className="h-8 w-8 text-gray-400" />
                  </div>
                )}
              </div>

              <div className="space-y-5">
                <section>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedProduct.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {selectedProduct.description || "No description available."}
                  </p>
                </section>

                <section className="grid grid-cols-2 gap-3">
                  <div className="rounded-md border p-3">
                    <div className="text-xs text-gray-500">Selling price</div>
                    <div className="mt-1 font-semibold">{formatMoney(selectedProduct.selling_price)}</div>
                  </div>
                  <div className="rounded-md border p-3">
                    <div className="text-xs text-gray-500">Cost price</div>
                    <div className="mt-1 font-semibold">{formatMoney(selectedProduct.cost_price)}</div>
                  </div>
                  <div className="rounded-md border p-3">
                    <div className="text-xs text-gray-500">Batch size</div>
                    <div className="mt-1 font-semibold">{selectedProduct.batch_size ?? "N/A"}</div>
                  </div>
                  <div className="rounded-md border p-3">
                    <div className="text-xs text-gray-500">Available stock</div>
                    <div className="mt-1 font-semibold">{selectedProduct.available_stock}</div>
                  </div>
                </section>

                <section className="rounded-md border p-4">
                  <h4 className="font-medium text-gray-900">Supplier</h4>
                  <div className="mt-2 text-sm text-gray-600">{selectedProduct.supplier.name}</div>
                  {selectedProduct.supplier.email && (
                    <div className="text-sm text-gray-500">{selectedProduct.supplier.email}</div>
                  )}
                </section>

                <section className="rounded-md border p-4">
                  <h4 className="font-medium text-gray-900">Inventory summary</h4>
                  <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-gray-500">Total quantity</div>
                      <div className="font-semibold">{selectedProduct.inventorySummary.totalQuantity}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Warehouses</div>
                      <div className="font-semibold">{selectedProduct.inventorySummary.warehouseCount}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Low stock</div>
                      <div className="font-semibold text-yellow-700">{selectedProduct.inventorySummary.lowStockCount}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Critical stock</div>
                      <div className="font-semibold text-red-700">{selectedProduct.inventorySummary.criticalStockCount}</div>
                    </div>
                  </div>
                </section>
              </div>
            </aside>
          </>
        )}
      </main>
    </LayoutWithSidebar>
  );
}
