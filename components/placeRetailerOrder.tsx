"use client";

import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import apiClient from "@/lib/apiClient";
import type { ProductCatalogItem, RetailerOrder, WarehouseClient } from "@/types";

type CartLine = {
    productId: number;
    name: string;
    quantity: number;
    unit_price: number;
};

type PlaceRetailerOrderProps = {
    warehouses: WarehouseClient[];
    onCreated?: (order: RetailerOrder) => void;
};

const PlaceRetailerOrder = ({ warehouses, onCreated }: PlaceRetailerOrderProps) => {
    const [open, setOpen] = useState(false);
    const [products, setProducts] = useState<ProductCatalogItem[]>([]);
    const [warehouseId, setWarehouseId] = useState<string>("");
    const [cart, setCart] = useState<Record<number, CartLine>>({});
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!open) return;
        apiClient.get("/products").then(res => setProducts(res.data.products ?? [])).catch(err => {
            console.error("Error fetching products", err);
        });
    }, [open]);

    const cartLines = Object.values(cart);
    const total = cartLines.reduce((sum, line) => sum + line.quantity * line.unit_price, 0);

    const updateQuantity = (product: ProductCatalogItem, quantity: number) => {
        setCart(prev => {
            const next = { ...prev };
            if (quantity <= 0) {
                delete next[product.id];
                return next;
            }
            next[product.id] = {
                productId: product.id,
                name: product.name,
                quantity,
                unit_price: Number(product.selling_price) || 0,
            };
            return next;
        });
    };

    const reset = () => {
        setWarehouseId("");
        setCart({});
        setError(null);
    };

    const handleSubmit = async () => {
        setError(null);
        if (!warehouseId || cartLines.length === 0) {
            setError("Pick a warehouse and at least one product.");
            return;
        }
        setSubmitting(true);
        try {
            const res = await apiClient.post("/warehouses/retailer_order/add", {
                warehouseId: Number(warehouseId),
                items: cartLines.map(line => ({
                    productId: line.productId,
                    quantity: line.quantity,
                    unit_price: line.unit_price,
                })),
            });
            onCreated?.(res.data.order);
            reset();
            setOpen(false);
        } catch (err) {
            console.error("Error placing order", err);
            setError("Could not place the order. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={(next) => { setOpen(next); if (!next) reset(); }}>
            <DialogTrigger asChild>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Place Order
                </button>
            </DialogTrigger>
            <DialogContent className="max-h-[85vh] overflow-y-auto">
                <DialogTitle>Place Order</DialogTitle>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Warehouse</label>
                        <select
                            className="border p-2 w-full rounded"
                            value={warehouseId}
                            onChange={(e) => setWarehouseId(e.target.value)}
                        >
                            <option value="">Select a warehouse</option>
                            {warehouses.map((w) => (
                                <option key={w.id} value={w.id}>{w.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Products</label>
                        <div className="space-y-2 max-h-56 overflow-y-auto border rounded-md p-2">
                            {products.length === 0 && (
                                <p className="text-sm text-gray-500">No products available.</p>
                            )}
                            {products.map((product) => (
                                <div key={product.id} className="flex items-center justify-between gap-3">
                                    <span className="text-sm truncate">{product.name}</span>
                                    <input
                                        type="number"
                                        min={0}
                                        className="border rounded p-1 w-20 text-sm"
                                        value={cart[product.id]?.quantity ?? ""}
                                        onChange={(e) => updateQuantity(product, Number(e.target.value) || 0)}
                                        placeholder="Qty"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {cartLines.length > 0 && (
                        <div className="border rounded-md p-3 space-y-1">
                            {cartLines.map((line) => (
                                <div key={line.productId} className="flex items-center justify-between text-sm">
                                    <span>{line.name} x {line.quantity}</span>
                                    <button
                                        type="button"
                                        onClick={() => setCart(prev => {
                                            const next = { ...prev };
                                            delete next[line.productId];
                                            return next;
                                        })}
                                        className="text-gray-400 hover:text-red-500"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                            <div className="text-right text-sm font-semibold pt-1 border-t">
                                Total: ${total.toFixed(2)}
                            </div>
                        </div>
                    )}

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <Button type="button" className="w-full" disabled={submitting} onClick={handleSubmit}>
                        {submitting ? "Placing Order..." : "Place Order"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default PlaceRetailerOrder;
