import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/home" className="nav-item">
        Home
      </NavLink>
      <NavLink to="/listas" className="nav-item">
        Listas
      </NavLink>
      <NavLink to="/admin-student" className="nav-item">
        Alumnos
      </NavLink>
    </nav>
  );
};

export default Navbar;
