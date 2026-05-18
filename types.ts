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

// Retailer Order Types
export type RetailerOrderItem = OrderItemBase;

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

export type StageStatus = "PENDING" | "ACTIVE" | "COMPLETED" | "SKIPPED" | "BLOCKED";
export type OrderLifecycleStatus = "OPEN" | "COMPLETED" | "CANCELLED";
export type CustomFieldType = "TEXT" | "NUMBER" | "DATE" | "BOOLEAN" | "SELECT";

export interface WorkflowStage {
  id: number;
  templateId: number;
  name: string;
  position: number;
  isRequired: boolean;
}

export interface WorkflowTemplate {
  id: number;
  businessId: number;
  name: string;
  isDefault: boolean;
  stages?: WorkflowStage[];
  fieldDefinitions?: OrderFieldDefinition[];
}

export interface SupplierOrderStageProgress {
  id: number;
  orderId: number;
  stageId: number;
  status: StageStatus;
  startedAt: string | null;
  completedAt: string | null;
  notes: string | null;
  stage: WorkflowStage;
}

export interface OrderFieldDefinition {
  id: number;
  businessId: number;
  templateId: number | null;
  name: string;
  key: string;
  type: CustomFieldType;
  required: boolean;
  options?: unknown;
}

export interface SupplierOrderFieldValue {
  id: number;
  orderId: number;
  fieldId: number;
  value: unknown;
  field: OrderFieldDefinition;
}

// Supplier Order Types
export type SuppOrderItem = OrderItemBase;

export interface SupplierOrder {
  id: number;
  businessId?: number | null;
  workflowTemplateId?: number | null;
  currentStageId?: number | null;
  order_date: string;
  warehouseId: number | null;
  supplier: {
    id: number;
    name: string;
  };
  total_amount: number | null;
  order_status: string;
  lifecycleStatus?: OrderLifecycleStatus;
  workflowTemplate?: WorkflowTemplate | null;
  currentStage?: WorkflowStage | null;
  stageProgress?: SupplierOrderStageProgress[];
  customFieldValues?: SupplierOrderFieldValue[];
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

export type ProductCatalogItem = {
  id: number;
  name: string;
  category: string | null;
  imageUrl: string | null;
  description: string | null;
  cost_price: string | null;
  selling_price: string | null;
  batch_size: number | null;
  available_stock: number;
  supplier: {
    id: number;
    name: string;
    email?: string;
  };
  inventorySummary: {
    totalQuantity: number;
    lowStockCount: number;
    criticalStockCount: number;
    warehouseCount: number;
  };
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
