import apiClient from "@/lib/apiClient";
import type { WarehouseClient } from "@/types";

export const getWarehouses = async (id: string, role: string) => {
  const res = await apiClient.get("/warehouses/getwarehouses", {
    params: { id, role },
  });
  return res.data;
};

export const addWarehouse = async (data: WarehouseClient) => {
  const res = await apiClient.post("/warehouses/add", data);
  return res.data;
};

export const getWarehouseProducts = async (warehouseId: string, id: string, role: string) => {
  const res = await apiClient.get(
    `/warehouses/${warehouseId}/inventory/getproducts`,
    {
      params: { id, role },
    }
  );
  return res.data;
};
