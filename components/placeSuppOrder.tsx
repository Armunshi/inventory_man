"use client";

import { Plus, X } from 'lucide-react'
import React, { useEffect, useMemo, useState } from 'react'
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog';
import apiClient from '@/lib/apiClient';
import type { ProductCatalogItem, SupplierOrder } from '@/types';
import type { WarehouseClient } from '@/types';
import { getBusinessUsers } from '@/services/userService';

type CartLine = {
    productId: number;
    name: string;
    quantity: number;
    unit_price: number;
};

type PlaceSuppOrderProps = {
    warehouses: WarehouseClient[];
    onCreated?: (order: SupplierOrder) => void;
};

const PlaceSuppOrder = ({ warehouses, onCreated }: PlaceSuppOrderProps) => {
    const [open, setOpen] = useState(false);
    const [products, setProducts] = useState<ProductCatalogItem[]>([]);
    const [suppliers, setSuppliers] = useState<{ id: number; name: string }[]>([]);
    const [warehouseId, setWarehouseId] = useState<string>('');
    const [supplierId, setSupplierId] = useState<string>('');
    const [cart, setCart] = useState<Record<number, CartLine>>({});
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!open) return;
        apiClient.get('/products').then(res => setProducts(res.data.products ?? [])).catch(err => {
            console.error('Error fetching products', err);
        });
        // Real invited SUPPLIER accounts, not just suppliers derived from
        // existing products — a freshly invited supplier with no products
        // yet should still be selectable here.
        getBusinessUsers('SUPPLIER').then((users: { id: number; name: string }[]) => setSuppliers(users)).catch(err => {
            console.error('Error fetching suppliers', err);
        });
    }, [open]);

    const supplierProducts = useMemo(
        () => products.filter(p => String(p.supplier.id) === supplierId),
        [products, supplierId]
    );

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
                unit_price: Number(product.cost_price) || 0,
            };
            return next;
        });
    };

    const resetForm = () => {
        setWarehouseId('');
        setSupplierId('');
        setCart({});
        setError(null);
    };

    const handleSubmit = async () => {
        setError(null);
        if (!warehouseId || !supplierId || cartLines.length === 0) {
            setError('Pick a warehouse, a supplier, and at least one product.');
            return;
        }
        setSubmitting(true);
        try {
            const res = await apiClient.post('/warehouses/supp_order/add', {
                warehouseId: Number(warehouseId),
                supplierId: Number(supplierId),
                order_date: new Date().toISOString(),
                items: cartLines.map(line => ({
                    productId: line.productId,
                    quantity: line.quantity,
                    unit_price: line.unit_price,
                })),
            });
            onCreated?.(res.data.order);
            resetForm();
            setOpen(false);
        } catch (err) {
            console.error('Error creating supplier order', err);
            setError('Could not create the order. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <Dialog open={open} onOpenChange={(next) => { setOpen(next); if (!next) resetForm(); }}>
                <DialogTrigger asChild>
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        New Supplier Order
                    </button>
                </DialogTrigger>
                <DialogContent className="max-h-[85vh] overflow-y-auto">
                    <DialogTitle>New Supplier Order</DialogTitle>

                    <div className="space-y-4 min-w-0">
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
                            <label className="block text-sm font-medium mb-1">Supplier</label>
                            <select
                                className="border p-2 w-full rounded"
                                value={supplierId}
                                onChange={(e) => { setSupplierId(e.target.value); setCart({}); }}
                            >
                                <option value="">Select a supplier</option>
                                {suppliers.map((s) => (
                                    <option key={s.id} value={s.id}>{s.name}</option>
                                ))}
                            </select>
                        </div>

                        {supplierId && (
                            <div>
                                <label className="block text-sm font-medium mb-2">Products</label>
                                <div className="space-y-2 max-h-56 overflow-y-auto border rounded-md p-2">
                                    {supplierProducts.length === 0 && (
                                        <p className="text-sm text-gray-500">No products found for this supplier.</p>
                                    )}
                                    {supplierProducts.map((product) => (
                                        <div key={product.id} className="flex items-center justify-between gap-3">
                                            <span className="text-sm truncate min-w-0">{product.name}</span>
                                            <input
                                                type="number"
                                                min={0}
                                                className="border rounded p-1 w-20 text-sm"
                                                value={cart[product.id]?.quantity ?? ''}
                                                onChange={(e) => updateQuantity(product, Number(e.target.value) || 0)}
                                                placeholder="Qty"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {cartLines.length > 0 && (
                            <div className="border rounded-md p-3 space-y-1">
                                {cartLines.map((line) => (
                                    <div key={line.productId} className="flex items-center justify-between text-sm">
                                        <span>{line.name} x {line.quantity}</span>
                                        <button
                                            type="button"
                                            onClick={() => updateQuantity({ id: line.productId } as ProductCatalogItem, 0)}
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
                            {submitting ? 'Placing Order...' : 'Place Order'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default PlaceSuppOrder
