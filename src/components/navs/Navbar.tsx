import type { JSX } from "react";
import { Link } from "react-router-dom";
import useLanguage from "../../lib/hooks/resources/useLanguage";
import { FORM_DICT } from "../../lib/states/lang/forms";

export default function Navbar(): JSX.Element {
  const { lang } = useLanguage();
  return (
    <nav
      className="navbar"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* <Link to="/" className="navbar-link" id="homeLink">
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
      </Link> */}
      <Link to="/forms" className="navbar-link navbar-button" id="testLink">
        {FORM_DICT[lang].str}
      </Link>
    </nav>
  );
}
