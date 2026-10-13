import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <strong>Suleja Homes</strong>
        <p>Find, like and rate homes you love.</p>
      </div>
      <div>
        <Link to="/properties">Properties</Link>
        <Link to="/about">About us</Link>
        <Link to="/contact">Contact us</Link>
      </div>
      <p className="copy">© 2026 Suleja Homes. Student project.</p>
    </footer>
  );
}