import { createContext, useContext, useEffect, useState } from "react";
import useAxios from "@/hook/useAxios.hook";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { fetchData } = useAxios();
  const [user, setUser] = useState(null);
  const [initialized, setInitialized] = useState(false);

  const isAuthenticated = !!user;

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
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
