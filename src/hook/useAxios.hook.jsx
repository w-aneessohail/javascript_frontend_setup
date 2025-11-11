import { useState, useEffect } from "react";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5002/api",
  withCredentials: true,
});

const useAxios = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (res) => res,
      async (err) => {
        const originalRequest = err.config;

        if (
          (err.response?.status === 401 || err.response?.status === 403) &&
          !originalRequest._retry
        ) {
          const hasRefreshToken = document.cookie.includes("refresh_token");
          if (!hasRefreshToken) {
            console.warn("No refresh token found — skipping refresh.");
            return Promise.reject(err);
          }

          originalRequest._retry = true;
          try {
            console.log("Attempting token refresh...");
            await axiosInstance.post("/refresh");
            return axiosInstance(originalRequest);
          } catch (refreshError) {
            console.error("Token refresh failed", refreshError);
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, []);

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
