import apiClient from "@/lib/apiClient";

export const registerUser = async (data: {
  Name: FormDataEntryValue | null;
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
  role: FormDataEntryValue | null;
}) => {
  const res = await apiClient.post("/auth/register", data);
  return res.data;
};