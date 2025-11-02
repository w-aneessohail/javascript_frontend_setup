import { useState } from "react";
import axios from "axios";

const useAxios = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "",
    withCredentials: true,
  });

  axiosInstance.interceptors.request.use((config) => {
    // add auth header if token exists
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  const fetchData = async ({ url, method = "get", data = {}, params = {} }) => {
    setLoading(true);
    try {
      const res = await axiosInstance({ url, method, data, params });
      setResponse(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { response, error, loading, fetchData };
};

export default useAxios;
