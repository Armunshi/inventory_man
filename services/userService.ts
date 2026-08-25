import apiClient from "@/lib/apiClient";

export const searchManagers = async (search: string) => {
  const res = await apiClient.get("/users/managers", {
    params: { search },
  });
  return res.data;
};

export type InviteUserPayload = {
  name: string;
  email: string;
  password: string;
  role: "SUPPLIER" | "RETAILER" | "WAREHOUSE_MANAGER";
  contact?: string;
  address?: string;
};

export const inviteUser = async (data: InviteUserPayload) => {
  const res = await apiClient.post("/users/invite", data);
  return res.data;
};

export const getBusinessUsers = async (role?: "SUPPLIER" | "RETAILER" | "WAREHOUSE_MANAGER") => {
  const res = await apiClient.get("/users/invite", { params: role ? { role } : undefined });
  return res.data.users;
};
