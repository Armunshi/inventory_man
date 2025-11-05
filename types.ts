export interface OrderItemBase {
  productId: number;
  quantity: number;
  unit_price: number | null;
  batch_size: number | null;

  product: {
    id: number;
    name: string;
    imageUrl?: string | null;
    category?: string | null;
    description?: string | null;
    batch_size?: number | null;
    supplierId: number;
    cost_price?: number | null;
    selling_price?: number | null;
    stockQty?: number | null;
    binLocation?: string | null;
  };
}

// ✅ Retailer Order Types
export interface RetailerOrderItem extends OrderItemBase {}

export interface RetailerOrder {
  id: number;
  order_date: string;
  retailer: {
    id: number;
    name: string;
  };
  warehouseId: number | null;
  total_amount: number | null;
  order_status: string;
  items: RetailerOrderItem[];
}

// ✅ Supplier Order Types
export interface SuppOrderItem extends OrderItemBase {}

export interface SupplierOrder {
  id: number;
  order_date: string;
  warehouseId: number | null;
  supplier: {
    id: number;
    name: string;
  };
  total_amount: number | null;
  order_status: string;
  items: SuppOrderItem[];
}

export type OrderProduct = {
  id: number;
  name: string;
  imageUrl: string;
  pickQty: number;
  binLocation: string;
  vendor: string;
  stockStatus: string;
  stockQty: number;
  cost_price: number;
  selling_price: number;
  category: string;
  description: string;
  batch_size: number;
  supplierId: number;
};



export interface WarehouseBase {
  name: string;
  location: string;
  capacity: number;
  managerName: string;
  totalProducts: number;
  lowStockCount: number;
  criticalCount: number;
  utilisationPercentage: number;
}
export interface WarehouseClient extends WarehouseBase {
  id: number;
  managerId: number;
}

