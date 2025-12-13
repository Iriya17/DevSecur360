// src/components/Navbar.js
import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png"; // ensure src/assets/logo.png exists

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="brand">
          <img src={logo} alt="DevSecur360 logo" className="brand-logo" />
          <span className="brand-text">DevSecur360</span>
        </div>

        <div className="nav-links">
          <NavLink to="/dashboard" className={({isActive})=>isActive? "nav-link active":"nav-link"}>Dashboard</NavLink>
          <NavLink to="/codescan" className={({isActive})=>isActive? "nav-link active":"nav-link"}>Code Scan</NavLink>
          <NavLink to="/externalscan" className={({isActive})=>isActive? "nav-link active":"nav-link"}>External Scan</NavLink>
          <NavLink to="/history" className={({isActive})=>isActive? "nav-link active":"nav-link"}>History</NavLink>
          <NavLink to="/about" className={({isActive})=>isActive? "nav-link active":"nav-link"}>About</NavLink>
        </div>
      </div>
    </nav>
  );
}
