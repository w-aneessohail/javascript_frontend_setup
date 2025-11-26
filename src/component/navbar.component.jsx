import { useAuth } from "@/context/auth.context";

const Navbar = () => {
  const { user, isAuthenticated, setUser } = useAuth();

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
      </div>
    </nav>
  );
};

export default Navbar;
