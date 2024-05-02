import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./StudentNavBar.css";

const StudentNavbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="navbarStudent">
      <div className="nav-header">
        <div className="nav-hamburger" onClick={toggleMenu}>
          <div className={`line ${showMenu ? "active" : ""}`}></div>
          <div className={`line ${showMenu ? "active" : ""}`}></div>
          <div className={`line ${showMenu ? "active" : ""}`}></div>
        </div>
      </div>
      <ul className={`nav-list ${showMenu ? "show" : ""}`}>
        <li className="nav-item">
          <NavLink
            to="/search-student"
            className="nav-link"
            active="active"
            onClick={toggleMenu}
          >
            Buscar alumno
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/cambio-de-comision"
            className="nav-link"
            onClick={toggleMenu}
          >
            Cambio de comisión
          </NavLink>
        </li>
        {/* <li className="nav-item">
          <NavLink
            to="/crear-alumno"
            className="nav-link"
      
            onClick={toggleMenu}
          >
            Insertar
          </NavLink>
        </li> */}
        {/* <li className="nav-item">
          <NavLink
            to="/update-student"
            className="nav-link"
        
            onClick={toggleMenu}
          >
            Actualizar
          </NavLink>
        </li> */}
        <li className="nav-item">
          <NavLink
            to="/delete-student"
            className="nav-link"
            onClick={toggleMenu}
          >
            Desactivar alumno
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default StudentNavbar;
