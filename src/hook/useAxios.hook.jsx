import { useState } from "react";
import axios from "axios";

const useAxios = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5002/api",
    withCredentials: true,
  });

  axiosInstance.interceptors.request.use((config) => {
    // Cookies are automatically included with credentials: true
    // Only access_token and refresh_token should be set by backend
    return config;
  });

  const fetchData = async ({ url, method = "get", data = {}, params = {} }) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axiosInstance({ url, method, data, params });
      setResponse(res.data);
      return res.data;
    } catch (err) {
      console.error("API Error:", err);
      const errMsg =
        err.response?.data?.message || err.response?.data || err.message;
      setError(errMsg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { response, error, loading, fetchData };
};

export default useAxios;
