import apiClient from "@/lib/apiClient";

export const deleteInventoryItems = async (ids: number[]) => {
  const res = await apiClient.delete("/inventory/delete", {
    data: { ids },
  });
  return res.data;
};