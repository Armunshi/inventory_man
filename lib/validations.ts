import { z } from "zod";

export const RoleEnum = z.enum(["ADMIN", "WAREHOUSE_MANAGER", "SUPPLIER", "RETAILER"]);

export const signupSchema = z.object({
  Name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: RoleEnum,
  contact: z.union([z.string(), z.number()]).optional().nullable(),
  address: z.string().optional().nullable(),
});

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const addWarehouseSchema = z.object({
  name: z.string().min(1, "Warehouse name is required"),
  location: z.string().min(1, "Location is required"),
  capacity: z.coerce.number().int().positive().optional(),
  managerId: z.coerce.number().int().positive().optional().nullable(),
});

export const addInventorySchema = z.object({
  name: z.string().min(1, "Product name is required"),
  category: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  cost_price: z.coerce.number().optional().nullable(),
  selling_price: z.coerce.number().optional().nullable(),
  batch_size: z.coerce.number().int().optional().nullable(),
  supplierId: z.coerce.number().int().positive(),
  min_stock: z.coerce.number().int().optional(),
  expiry: z.string().optional().nullable(),
  quantity: z.coerce.number().int().optional(),
});

export const suppOrderItemSchema = z.object({
  productId: z.coerce.number().int().positive(),
  quantity: z.coerce.number().int().positive(),
  unit_price: z.coerce.number().nonnegative(),
  batch_size: z.coerce.number().int().optional().nullable(),
});

export const createSuppOrderSchema = z.object({
  warehouseId: z.coerce.number().int().positive(),
  supplierId: z.coerce.number().int().positive(),
  order_date: z.string().optional(),
  items: z.array(suppOrderItemSchema).min(1, "At least one item is required"),
  workflowTemplateId: z.coerce.number().int().positive().optional(),
  customFields: z.unknown().optional(),
});

export const inviteUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["SUPPLIER", "RETAILER", "WAREHOUSE_MANAGER"]),
  contact: z.union([z.string(), z.number()]).optional().nullable(),
  address: z.string().optional().nullable(),
});

export const retailerOrderItemSchema = z.object({
  productId: z.coerce.number().int().positive(),
  quantity: z.coerce.number().int().positive(),
  unit_price: z.coerce.number().nonnegative(),
});

export const createRetailerOrderSchema = z.object({
  warehouseId: z.coerce.number().int().positive(),
  items: z.array(retailerOrderItemSchema).min(1, "At least one item is required"),
});
