import React, { createContext, useContext, useEffect, useState } from "react";
import useAxios from "@/hook/useAxios.hook";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { fetchData } = useAxios();
  const [user, setUser] = useState(null);
  const [initialized, setInitialized] = useState(false);

  const isAuthenticated = !!user;

  useEffect(() => {
    const loadProfile = async () => {
      const result = await fetchData({ url: "/profile", method: "get" });
      if (result && result.foundUser) {
        setUser(result.foundUser);
      }
      setInitialized(true);
    };
    loadProfile();
  }, [fetchData]);

  const logout = async () => {
    await fetchData({ url: "/logout", method: "post" });
    setUser(null);
  };

  if (!initialized) return <div>Loading...</div>;

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
