import { createContext, useContext, useState } from "react";
import useAxios from "@/hook/useAxios.hook";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { fetchData } = useAxios();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const isAuthenticated = !!user;

  const loadProfile = async () => {
    setLoading(true);
    const result = await fetchData({ url: "/profile", method: "get" });
    if (result && result.foundUser) {
      setUser(result.foundUser);
    }
    setLoading(false);
    return result;
  };

  const logout = async () => {
    await fetchData({ url: "/logout", method: "post" });
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthenticated, logout, loadProfile, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
