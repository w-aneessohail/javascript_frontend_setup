import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/auth.context";
import { UserRole } from "@/enum/userRole.enum";

const RoleRedirect = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/auth/login" replace />;

  switch (user.role) {
    case UserRole.ADMIN:
      return <Navigate to="/dashboard/admin" replace />;
    case UserRole.ORGANIZER:
      return <Navigate to="/dashboard/organizer" replace />;
    case UserRole.ATTENDEE:
    default:
      return <Navigate to="/dashboard/attendee" replace />;
  }
};

export default RoleRedirect;
