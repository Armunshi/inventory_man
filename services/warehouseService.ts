import apiClient from "@/lib/apiClient";
import type { WarehouseClient } from "@/types";

export const getWarehouses = async () => {
  const res = await apiClient.get("/warehouses/getwarehouses");
  return res.data;
};

export const addWarehouse = async (data: Partial<WarehouseClient>) => {
  const res = await apiClient.post("/warehouses/add", data);
  return res.data;
};

export const getWarehouseProducts = async (warehouseId: string) => {
  const res = await apiClient.get(`/warehouses/${warehouseId}/inventory/getproducts`);
  return res.data;
};
