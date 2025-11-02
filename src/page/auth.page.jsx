import React from "react";
import { Outlet } from "react-router-dom";

const AuthPage = () => (
  <div className="container vh-100 d-flex align-items-center justify-content-center">
    <div style={{ width: "100%", maxWidth: 480 }}>
      <Outlet />
    </div>
  </div>
);

export default AuthPage;
