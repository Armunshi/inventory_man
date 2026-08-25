import apiClient from "@/lib/apiClient";

export const searchManagers = async (search: string) => {
  const res = await apiClient.get("/users/managers", {
    params: { search },
  });
  return res.data;
};
