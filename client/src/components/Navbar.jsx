import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="topbar">
      <Link to="/" className="brand">
        Trip Planner
      </Link>
      <nav className="navlinks">
        <NavLink to="/">Home</NavLink>
        {user && <NavLink to="/create-trip">Create Trip</NavLink>}
        {user && <NavLink to="/history">History</NavLink>}
        {user && <NavLink to="/profile">Profile</NavLink>}
        {user?.role === "admin" && <NavLink to="/admin">Admin</NavLink>}
      </nav>
      <div className="navactions">
        {user ? (
          <>
            <span className="username">{user.name}</span>
            <button onClick={handleLogout} className="ghost-button">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="ghost-button">
              Login
            </Link>
            <Link to="/register" className="primary-button">
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
