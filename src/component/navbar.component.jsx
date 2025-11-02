import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <Link to="/" className="navbar-brand fw-bold">
        EventX
      </Link>
      <div className="navbar-nav ms-auto">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/events" className="nav-link">
          Events
        </Link>
        <Link to="/booking" className="nav-link">
          Booking
        </Link>
        <Link to="/auth/login" className="nav-link">
          Login
        </Link>

        {isAuthenticated ? (
          <div className="dropdown ms-3">
            <button
              className="btn btn-outline-secondary dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              <img
                src={user?.profileImageUrl || "/default-avatar.png"}
                alt="profile"
                style={{ width: "30px", borderRadius: "50%", marginRight: 6 }}
              />
              {user?.firstName || "User"}
            </button>
            <ul className="dropdown-menu">
              <li className="dropdown-item">{user?.email}</li>
              <li>
                <button className="dropdown-item" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
