import { useAuth } from "@/context/auth.context";
<<<<<<< HEAD

const HomePage = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
=======
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "@/enum/route.enum";

const HomePage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated || !user) {
    return (
      <Container className="d-flex align-items-center justify-content-center vh-100">
        <Card className="text-center shadow-sm p-5">
          <h2 className="mb-4">Welcome</h2>
          <p className="mb-4">Please login to access the home page</p>
          <Button
            variant="primary"
            onClick={() => navigate(RoutePath.REGISTER)}
          >
            Login / Register
          </Button>
        </Card>
      </Container>
>>>>>>> 6f288e458fb1f70bdae17f2d10fa650c42343530
    );
  }

  return (
<<<<<<< HEAD
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card shadow-lg p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>Welcome, {user.name}!</h2>
            </div>

            <div className="card-body">
              <h5 className="card-title mb-3">Your Profile Information</h5>

              <div className="row mb-3">
                <div className="col-md-6">
                  <p>
                    <strong>Name:</strong> {user.name}
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <p>
                    <strong>Role:</strong>{" "}
                    <span className="badge bg-primary">{user.role}</span>
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    <strong>Verified:</strong>{" "}
                    <span
                      className={
                        user.isVerified
                          ? "badge bg-success"
                          : "badge bg-warning"
                      }
                    >
                      {user.isVerified ? "Yes" : "No"}
                    </span>
                  </p>
                </div>
              </div>

              {user.organizers && (
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
=======
    <Container className="py-5">
      <Row className="mb-4">
        <Col md={8}>
          <h1 className="mb-3">Welcome, {user.name}!</h1>
          <p className="text-muted">Here's your profile information:</p>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <Card.Title>Profile Information</Card.Title>
              <div className="mt-3">
                <div className="mb-3">
                  <strong>Name:</strong> <span>{user.name || "N/A"}</span>
                </div>
                <div className="mb-3">
                  <strong>Email:</strong> <span>{user.email || "N/A"}</span>
                </div>
                <div className="mb-3">
                  <strong>Role:</strong>{" "}
                  <span className="badge bg-primary">{user.role || "N/A"}</span>
                </div>
                <div className="mb-3">
                  <strong>Verified:</strong>{" "}
                  <span
                    className={
                      user.isVerified ? "badge bg-success" : "badge bg-warning"
                    }
                  >
                    {user.isVerified ? "Yes" : "No"}
                  </span>
                </div>
                {user.profileImage && (
                  <div className="mb-3">
                    <img
                      src={user.profileImage || "/placeholder.svg"}
                      alt={user.name}
                      className="img-fluid rounded"
                      style={{ maxWidth: "200px" }}
                    />
                  </div>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Account Details</Card.Title>
              <div className="mt-3">
                <div className="mb-3">
                  <strong>Created At:</strong>{" "}
                  <span>
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
                <div className="mb-3">
                  <strong>Updated At:</strong>{" "}
                  <span>
                    {user.updatedAt
                      ? new Date(user.updatedAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
                {user.organizers !== null && (
                  <div className="mb-3">
                    <strong>Organizer Status:</strong>{" "}
                    <span>{user.organizers ? "Active" : "Inactive"}</span>
                  </div>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
>>>>>>> 6f288e458fb1f70bdae17f2d10fa650c42343530
  );
};

export default HomePage;
