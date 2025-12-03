import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation(); // Get current URL path

  // Styles
  const navbarStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    padding: "15px",
    backgroundColor: "#333",
  };

  const linkStyle = (path) => ({
    color: location.pathname === path ? "#ffcc00" : "white",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "18px",
  });

  return (
    <nav style={navbarStyle}>
      <Link to="/" style={linkStyle("/")}>Home</Link>
      <Link to="/games" style={linkStyle("/games")}>Games</Link>
      <Link to="/categories" style={linkStyle("/categories")}>Categories</Link>
    </nav>
  );
}

export default Navbar;
