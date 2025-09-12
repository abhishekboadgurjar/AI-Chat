import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // backend
});

// Interceptor to attach token
axiosInstance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
