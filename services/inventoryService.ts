import apiClient from "@/lib/apiClient";

export const deleteInventoryItems = async (warehouseId: string, ids: number[]) => {
  const res = await apiClient.delete(`/warehouses/${warehouseId}/inventory/delete`, {
    data: { ids },
  });
  return res.data;
};
