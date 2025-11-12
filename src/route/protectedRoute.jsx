"use client";

import { Navigate, useParams } from "react-router-dom";
import { useAuth } from "@/context/auth.context";
import { RoutePath } from "@/enum";

const ProtectedRoute = ({
  children,
  redirectBasedOnRole = false,
  rolePath,
}) => {
  const { isAuthenticated, user } = useAuth();
  const params = useParams();

  if (!isAuthenticated) {
    return <Navigate to={RoutePath.LOGIN} replace />;
  }

  if (redirectBasedOnRole && rolePath) {
    const rolePathMap = {
      ATTENDEE: "/attendee",
      ORGANIZER: "/organizer",
      ADMIN: "/admin",
    };

    const userRole = user?.role?.toUpperCase() || "ATTENDEE";
    const basePath = rolePathMap[userRole] || "/attendee";

    let finalPath = rolePath;
    Object.keys(params).forEach((key) => {
      finalPath = finalPath.replace(`:${key}`, params[key]);
    });

    return <Navigate to={`${basePath}/${finalPath}`} replace />;
  }

  return children;
};

export default ProtectedRoute;
