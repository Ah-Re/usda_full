import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="nav">
      <Link to="/" style={{ textDecoration: "none" }}>
        <h1>USDA Food</h1>
      </Link>

      <Link to="/cart" style={{ textDecoration: "none" }}>
        <i
          className="fas fa-shopping-cart shopping-icon"
          style={{ textDecoration: "none" }}
        ></i>
      </Link>
    </div>
  );
};

export default Navbar;
