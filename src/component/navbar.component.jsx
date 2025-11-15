<<<<<<< HEAD
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";
=======
import { useAuth } from "@/context/auth.context";
>>>>>>> 6f288e458fb1f70bdae17f2d10fa650c42343530

const Navbar = () => {
  const { user, isAuthenticated, setUser } = useAuth();

<<<<<<< HEAD
  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  const getInitials = () => {
    if (!user) return "U";
    const firstInitial = user.firstName?.charAt(0) || "";
    const lastInitial = user.lastName?.charAt(0) || "";
    return (firstInitial + lastInitial).toUpperCase();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 shadow-sm">
      <Link to="/" className="navbar-brand fw-bold text-primary">
        EventX
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <div className="navbar-nav ms-auto align-items-center">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/events" className="nav-link">
            Events
          </Link>
          <Link to="/event-reviews" className="nav-link">
            Event Reviews
          </Link>
          <Link to="/about" className="nav-link">
            About Us
          </Link>
          <Link to="/contact" className="nav-link">
            Contact Us
          </Link>

          {isAuthenticated ? (
            <>
              <div className="dropdown ms-3">
                <button
                  className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px" }}
                  data-bs-toggle="dropdown"
                  title={`${user?.firstName} ${user?.lastName}`}
                >
                  <span className="fw-bold">{getInitials()}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li className="dropdown-item-text">
                    <strong>
                      {user?.firstName} {user?.lastName}
                    </strong>
                    <br />
                    <small className="text-muted">{user?.email}</small>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link to="/profile" className="dropdown-item">
                      Edit Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <Link to="/auth/login" className="btn btn-primary ms-3">
              Login
            </Link>
          )}
        </div>
=======
  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5002/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        console.log("Logout failed:", res.statusText);
        return;
      }

      // Clear user from context after successful logout
      setUser(null);
      console.log("Logout successful");
    } catch (err) {
      console.log("Logout error:", err.message);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <a className="navbar-brand" href="/">
        MyApp
      </a>

      <div className="ms-auto">
        {isAuthenticated ? (
          <>
            <span className="me-3">
              Welcome, <strong>{user?.name || user?.email}</strong>
            </span>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <a href="/login" className="btn btn-outline-primary btn-sm">
            Login
          </a>
        )}
>>>>>>> 6f288e458fb1f70bdae17f2d10fa650c42343530
      </div>
    </nav>
  );
};

export default Navbar;
