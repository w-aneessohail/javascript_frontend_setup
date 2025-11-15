import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/auth.context";

const RoleBasedRedirect = () => {
  const { user, isAuthenticated, initialized, loading } = useAuth();

  if (!initialized || loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/auth/login" replace />;
  }

  const rolePathMap = {
    ATTENDEE: "/attendee",
    ORGANIZER: "/organizer",
    ADMIN: "/admin",
  };

  const userRole = user?.role?.toUpperCase() || "ATTENDEE";
  const redirectPath = rolePathMap[userRole] || "/attendee";

  return <Navigate to={redirectPath} replace />;
};

export default RoleBasedRedirect;
