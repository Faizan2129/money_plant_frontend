import React from "react";
import logo from "./logo.jpg";  // Correct import for the logo
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        {/* Logo */}
        <a className="navbar-brand" href="/">
          <img
            src={logo}  // Using the imported logo here
            alt="Logo"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          MoneyPlant
        </a>

        {/* Toggler for mobile view */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#features">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#reviews">
                Reviews
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about-us">
                About Us
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact-us">
                Contact Us
              </a>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
