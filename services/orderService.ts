import apiClient from "@/lib/apiClient";

export const getRetailerOrders = async (warehouseId: number) => {
  const res = await apiClient.get("/warehouses/retailer_order/getOrders", {
    params: { warehouseId },
  });
  return res.data.orders;
};

export const getSupplierOrders = async (warehouseId: number) => {
  const res = await apiClient.get("/warehouses/supp_order/getOrders", {
    params: { warehouseId },
  });
  return res.data.data;
};