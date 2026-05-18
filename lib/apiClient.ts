import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api",
  withCredentials: true, // important for auth cookies
});

export default apiClient;