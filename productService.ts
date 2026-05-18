import apiClient from "@/lib/apiClient";

export type ProductPayload = Record<string, unknown>;

export const addProductToWarehouse = async (warehouseId: string, data: ProductPayload) => {
  const res = await apiClient.post(
    `/warehouses/${warehouseId}/inventory/add`,
    data
  );
  return res.data;
};
