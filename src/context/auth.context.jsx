import React, { createContext, useContext, useEffect, useState } from "react";
import useAxios from "../hook/useAxios.hook";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { response, fetchData } = useAxios();
  const [user, setUser] = useState(null);
  const [initialized, setInitialized] = useState(false);
  const isAuthenticated = !!user;

  useEffect(() => {
    // attempt to fetch current profile if token exists
    fetchData({ url: "profile", method: "get" });
  }, [fetchData]);

  useEffect(() => {
    if (response) setUser(response);
    setInitialized(true);
  }, [response]);

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("token");
    } catch (e) {}
  };

  if (!initialized) return <p>Loading...</p>;

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
