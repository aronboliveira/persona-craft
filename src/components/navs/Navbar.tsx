import type { JSX } from "react";
import { Link } from "react-router-dom";

export default function Navbar(): JSX.Element {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-link" id="homeLink">
        Home
      </Link>
      <Link to="/about" className="navbar-link" id="aboutLink">
        About us
      </Link>
      <Link to="/" className="navbar-link" id="contactLink">
        Contact us
      </Link>
      <Link to="/" className="navbar-link" id="reportLink">
        Report issues
      </Link>
      <Link to="/" className="navbar-link" id="privacyLink">
        Privacy policy
      </Link>
      <Link to="/subscribe" className="navbar-link" id="plansLink">
        Subscribe
      </Link>
      <Link to="/test" className="navbar-link" id="testLink">
        Test
      </Link>
    </nav>
  );
}
