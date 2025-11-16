import { useAuth } from "@/context/auth.context";
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
    );
  }

  return (
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
  );
};

export default HomePage;
