import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth.context";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/auth/login" replace />;
  return children || <Outlet />;
};

export default ProtectedRoute;
