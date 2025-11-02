import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import useAxios from "../hook/useAxios.hook";

const AttendeeDashboardPage = () => {
  const { response, loading, fetchData } = useAxios();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      await fetchData({ url: "/profile", method: "get" });
    };
    loadProfile();
  }, [fetchData]);

  useEffect(() => {
    if (response) setUserData(response);
  }, [response]);

  if (loading || !userData) {
    return (
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card shadow-lg p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>Welcome, {userData.name}!</h2>
            </div>

            <div className="card-body">
              <h5 className="card-title mb-3">Your Profile Information</h5>

              <div className="row mb-3">
                <div className="col-md-6">
                  <p>
                    <strong>Name:</strong> {userData.name}
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    <strong>Email:</strong> {userData.email}
                  </p>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <p>
                    <strong>Role:</strong>{" "}
                    <span className="badge bg-primary">{userData.role}</span>
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    <strong>Verified:</strong>{" "}
                    <span
                      className={
                        userData.isVerified
                          ? "badge bg-success"
                          : "badge bg-warning"
                      }
                    >
                      {userData.isVerified ? "Yes" : "No"}
                    </span>
                  </p>
                </div>
              </div>

              {userData.organizers && (
                <>
                  <hr />
                  <h5 className="card-title mb-3">Organizer Details</h5>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <p>
                        <strong>Organization Name:</strong>{" "}
                        {userData.organizers.organizationName}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p>
                        <strong>Organizer Name:</strong>{" "}
                        {userData.organizers.organizerName}
                      </p>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <p>
                        <strong>CNIC:</strong> {userData.organizers.cnic}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p>
                        <strong>Phone:</strong> {userData.organizers.phone}
                      </p>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-12">
                      <p>
                        <strong>Address:</strong> {userData.organizers.address}
                      </p>
                    </div>
                  </div>
                </>
              )}

              <div className="alert alert-info mt-4">
                <strong>Note:</strong> Your authentication token is stored as an{" "}
                <code>HttpOnly</code> cookie. It’s automatically sent with each
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
