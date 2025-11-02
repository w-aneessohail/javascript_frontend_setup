import React from "react";
const ProfileDropdown = ({ user, onLogout }) => (
  <div className="dropdown">
    <button
      className="btn btn-secondary dropdown-toggle"
      data-bs-toggle="dropdown"
    >
      <img
        src={user?.profileImageUrl || "/default-avatar.png"}
        alt="p"
        style={{ width: 28, borderRadius: "50%", marginRight: 8 }}
      />
      {user?.firstName || "User"}
    </button>
    <ul className="dropdown-menu">
      <li className="dropdown-item">{user?.email}</li>
      <li className="dropdown-item">
        <button onClick={onLogout}>Logout</button>
      </li>
    </ul>
  </div>
);
export default ProfileDropdown;
