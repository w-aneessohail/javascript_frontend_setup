import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "@/context/auth.context";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AttendeeDashboardPage = () => {
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
                    border: "3px solid #007bff",
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
                  <span className="badge bg-primary">{user?.role}</span>
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
        <div className="col-md-8 mx-auto">
          <div className="card shadow-lg p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>Welcome, {user?.name}!</h2>
            </div>

            <div className="card-body">
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
                        user?.isVerified
                          ? "badge bg-success"
                          : "badge bg-warning"
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
                  <h5 className="card-title mb-3">Organizer Details</h5>

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
        </div>
      </div>
    </div>
  );
};

export default AttendeeDashboardPage;
