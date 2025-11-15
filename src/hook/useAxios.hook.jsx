import { useState, useCallback, useEffect } from "react";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5002/api",
  withCredentials: true,
});

const refreshAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5002/api",
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];
let logoutCallback = null;

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const useAxios = (logoutFn) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    logoutCallback = logoutFn;
  }, [logoutFn]);

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (res) => res,
      async (err) => {
        const originalRequest = err.config;

        if (originalRequest.url === "/refresh-token") {
          console.warn("[v0] Refresh token request failed, logging out");
          if (logoutCallback) logoutCallback();
          return Promise.reject(err);
        }

        if (
          (err.response?.status === 401 || err.response?.status === 403) &&
          !originalRequest._retry
        ) {
          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            })
              .then(() => {
                return axiosInstance(originalRequest);
              })
              .catch((error) => {
                if (logoutCallback) logoutCallback();
                return Promise.reject(error);
              });
          }

          originalRequest._retry = true;
          isRefreshing = true;

          try {
            console.log("[v0] Attempting token refresh...");
            const refreshResponse = await refreshAxios.post("/refresh-token");

            if (refreshResponse.status === 200) {
              console.log("[v0] Token refresh successful");
              processQueue(null);
              return axiosInstance(originalRequest);
            } else {
              throw new Error("Refresh failed with non-200 status");
            }
          } catch (refreshError) {
            console.error("[v0] Token refresh failed", refreshError);
            if (logoutCallback) logoutCallback();
            processQueue(refreshError);
            return Promise.reject(refreshError);
          } finally {
            isRefreshing = false;
          }
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, []);

  const fetchData = useCallback(
    async ({ url, method = "get", data = {}, params = {} }) => {
      setLoading(true);
      setError(null);

      try {
        const res = await axiosInstance({
          url,
          method,
          data,
          params,
          withCredentials: true,
        });
        setResponse(res.data);
        return res.data;
      } catch (err) {
        console.error("[v0] API Error:", err.message);
        const errMsg =
          err.response?.data?.message || err.response?.data || err.message;
        setError(errMsg);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { response, error, loading, fetchData };
};

export default useAxios;
