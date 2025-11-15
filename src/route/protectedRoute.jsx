import { Navigate, useParams } from "react-router-dom";
import { useAuth } from "@/context/auth.context";
import { RoutePath } from "@/enum";

const ProtectedRoute = ({
  children,
  redirectBasedOnRole = false,
  rolePath,
}) => {
  const { isAuthenticated, user, loading, initialized } = useAuth();
  const params = useParams();

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
