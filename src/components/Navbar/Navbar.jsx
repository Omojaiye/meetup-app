import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth();
  return (
    <header className="nav">
      <Link to="/" className="logo">Suleja Homes</Link>
      <nav>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/properties">Properties</NavLink>
        <NavLink to="/about">About us</NavLink>
        <NavLink to="/contact">Contact us</NavLink>
        {isAdmin && <NavLink to="/admin">Admin</NavLink>}
      </nav>
      <div className="nav-auth">
        {user ? (
          <>
            <span>Hi, {user.name}</span>
            <button className="btn-outline" onClick={logout}>Log out</button>
          </>
        ) : (
          <>
            <Link to="/login">Log in</Link>
            <Link to="/register" className="btn">Register</Link>
          </>
        )}
      </div>
    </header>
  );
}
