import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "@/context/auth.context";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdminDashboardPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mt-5">
      <div className="row mb-4">
        <div className="col-md-12">
          <div className="card shadow-lg p-4">
            <div className="d-flex align-items-center gap-4">
              <div>
                <img
                  src={user?.profileImageUrl || "/placeholder-user.jpg"}
                  alt="profile"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "3px solid #dc3545",
                  }}
                />
              </div>
              <div className="flex-grow-1">
                <h2 className="mb-2">{user?.name}</h2>
                <p className="mb-1">
                  <strong>Email:</strong> {user?.email}
                </p>
                <p className="mb-1">
                  <strong>Role:</strong>{" "}
                  <span className="badge bg-danger">{user?.role}</span>
                </p>
                <p className="mb-0">
                  <strong>Verified:</strong>{" "}
                  <span
                    className={
                      user?.isVerified ? "badge bg-success" : "badge bg-warning"
                    }
                  >
                    {user?.isVerified ? "Yes" : "No"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <h2 className="mb-4">Admin Dashboard</h2>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card shadow-sm p-3 text-center">
            <h5 className="text-muted">Total Users</h5>
            <h2 className="text-primary">0</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm p-3 text-center">
            <h5 className="text-muted">Total Events</h5>
            <h2 className="text-success">0</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm p-3 text-center">
            <h5 className="text-muted">Total Revenue</h5>
            <h2 className="text-info">$0</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm p-3 text-center">
            <h5 className="text-muted">Active Sessions</h5>
            <h2 className="text-warning">0</h2>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="card shadow-lg p-4">
            <h5 className="card-title mb-3">System Overview</h5>

            <div className="row mb-3">
              <div className="col-md-6">
                <p>
                  <strong>Admin Name:</strong> {user?.name}
                </p>
              </div>
              <div className="col-md-6">
                <p>
                  <strong>Admin Email:</strong> {user?.email}
                </p>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <p>
                  <strong>Role:</strong>{" "}
                  <span className="badge bg-danger">{user?.role}</span>
                </p>
              </div>
              <div className="col-md-6">
                <p>
                  <strong>Verified:</strong>{" "}
                  <span
                    className={
                      user?.isVerified ? "badge bg-success" : "badge bg-warning"
                    }
                  >
                    {user?.isVerified ? "Yes" : "No"}
                  </span>
                </p>
              </div>
            </div>

            <hr />
            <h5 className="card-title mb-3">Recent Activity</h5>
            <p className="text-muted">No recent activity to display</p>

            <div className="alert alert-info mt-4">
              <strong>Note:</strong> Your authentication token is stored as an{" "}
              <code>HttpOnly</code> cookie. It's automatically sent with each
              request for security.
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-lg p-4">
            <h5 className="card-title mb-3">Admin Actions</h5>
            <button className="btn btn-danger w-100 mb-2">Manage Users</button>
            <button className="btn btn-warning w-100 mb-2">
              Manage Events
            </button>
            <button className="btn btn-info w-100 mb-2">View Reports</button>
            <button className="btn btn-outline-secondary w-100">
              System Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
