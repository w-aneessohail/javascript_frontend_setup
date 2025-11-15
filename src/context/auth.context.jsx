<<<<<<< HEAD
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import axios from "axios";
=======
import { createContext, useContext, useEffect, useState } from "react";
>>>>>>> 6f288e458fb1f70bdae17f2d10fa650c42343530
import useAxios from "@/hook/useAxios.hook";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const initRef = useRef(false);

  const isAuthenticated = !!user;

<<<<<<< HEAD
  const logout = useCallback(async () => {
    try {
      console.log("[v0] Logging out - calling /logout endpoint");
      const tempAxios = axios.create({
        baseURL:
          import.meta.env.VITE_API_BASE_URL || "http://localhost:5002/api",
        withCredentials: true,
      });
      await tempAxios.post("/logout");
      console.log("[v0] Logout successful, clearing local state");
    } catch (error) {
      console.error("[v0] Logout error:", error);
    } finally {
      setUser(null);
      initRef.current = false;
      document.cookie =
        "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      console.log("[v0] User state cleared and cookies expired");
    }
  }, []);

  const { fetchData } = useAxios(logout);

  const initializeAuth = useCallback(async () => {
    if (initRef.current) return;
    initRef.current = true;

    try {
      setLoading(true);
      console.log("[v0] Initializing auth - fetching profile...");
      const result = await fetchData({ url: "/profile", method: "get" });
      console.log("[v0] Profile fetch result:", result);

      if (result && result.user) {
        console.log("[v0] User found and set:", result.user.email);
        setUser(result.user);
      } else {
        console.log("[v0] No user found in profile response");
        if (result !== null) {
          setUser(null);
        }
      }
    } catch (error) {
      console.error("[v0] Failed to restore session:", error);
    } finally {
      setLoading(false);
      setInitialized(true);
      console.log("[v0] Auth initialization complete");
    }
  }, [fetchData]);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const loadProfile = async () => {
    setLoading(true);
    const result = await fetchData({ url: "/profile", method: "get" });
    if (result && result.user) {
      setUser(result.user);
    }
    setLoading(false);
    return result;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        logout,
        loadProfile,
        loading,
        initialized,
      }}
    >
=======
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const result = await fetchData({ url: "/profile", method: "get" });
        const userData =
          result?.user || result?.foundUser || result?.data || result;

        if (userData && userData.email) {
          setUser(userData);
        }
      } catch (error) {
        console.log("Error loading profile:", error.message);
      } finally {
        setInitialized(true);
      }
    };

    loadProfile();
  }, []);

  if (!initialized) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated }}>
>>>>>>> 6f288e458fb1f70bdae17f2d10fa650c42343530
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
