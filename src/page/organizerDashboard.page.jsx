import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "@/context/auth.context";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const OrganizerDashboardPage = () => {
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
                    border: "3px solid #28a745",
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
                  <span className="badge bg-success">{user?.role}</span>
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
          <h2 className="mb-4">Welcome, {user?.name}!</h2>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card shadow-sm p-3 text-center">
            <h5 className="text-muted">Events Created</h5>
            <h2 className="text-primary">0</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm p-3 text-center">
            <h5 className="text-muted">Total Attendees</h5>
            <h2 className="text-success">0</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm p-3 text-center">
            <h5 className="text-muted">Revenue</h5>
            <h2 className="text-info">$0</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm p-3 text-center">
            <h5 className="text-muted">Pending Tasks</h5>
            <h2 className="text-warning">0</h2>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="card shadow-lg p-4">
            <h5 className="card-title mb-3">Your Profile Information</h5>

            <div className="row mb-3">
              <div className="col-md-6">
                <p>
                  <strong>Name:</strong> {user?.name}
                </p>
              </div>
              <div className="col-md-6">
                <p>
                  <strong>Email:</strong> {user?.email}
                </p>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <p>
                  <strong>Role:</strong>{" "}
                  <span className="badge bg-primary">{user?.role}</span>
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

            {user?.organizers && (
              <>
                <hr />
                <h5 className="card-title mb-3">Organization Details</h5>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <p>
                      <strong>Organization Name:</strong>{" "}
                      {user.organizers.organizationName}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p>
                      <strong>Organizer Name:</strong>{" "}
                      {user.organizers.organizerName}
                    </p>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <p>
                      <strong>CNIC:</strong> {user.organizers.cnic}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p>
                      <strong>Phone:</strong> {user.organizers.phone}
                    </p>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-12">
                    <p>
                      <strong>Address:</strong> {user.organizers.address}
                    </p>
                  </div>
                </div>
              </>
            )}

            <div className="alert alert-info mt-4">
              <strong>Note:</strong> Your authentication token is stored as an{" "}
              <code>HttpOnly</code> cookie. It's automatically sent with each
              request for security.
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-lg p-4">
            <h5 className="card-title mb-3">Quick Actions</h5>
            <button className="btn btn-primary w-100 mb-2">Create Event</button>
            <button className="btn btn-outline-primary w-100 mb-2">
              View Events
            </button>
            <button className="btn btn-outline-secondary w-100">
              Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboardPage;
