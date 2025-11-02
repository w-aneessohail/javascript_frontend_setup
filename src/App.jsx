import React from "react";
import { useAuth } from "./context/auth.context";

const App = () => {
  const { user } = useAuth();
  return (
    <div style={{ padding: 20 }}>
      <h2>App Placeholder</h2>
      <p>User: {user ? user.email : "No user logged in"}</p>
    </div>
  );
};

export default App;
