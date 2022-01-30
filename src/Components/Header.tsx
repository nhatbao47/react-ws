import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => (
  <nav className="navbar navbar-expand-lg bg-light navbar-light">
    <a className="navbar-brand" href="#">
      <img
        width="40"
        alt="React Logo"
        src="/logo192.png"
      />
    </a>
    <div className="collapse navbar-collapse">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <NavLink to="/dashboard" className="nav-link">
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/users" className="nav-link">
            User
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/schedules" className="nav-link">
            Schedule
          </NavLink>
        </li>
      </ul>
      <ul className="nav navbar-nav mr-3">
        <li className="nav-item dropdown">
          <div className="d-inline-block">
            <button className="btn btn-link" id="dropdownMenu">
              <i className="fa fa-user-circle-o" aria-hidden="true"></i> Username: David
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenu1">
              <button className="dropdown-item">Log out</button>
            </div>
          </div>
        </li>
        <li className="nav-item">
          <NavLink to="/login" className="nav-link">
            <i className="fa fa-sign-in" aria-hidden="true"></i> Login
          </NavLink>
        </li>
      </ul>
    </div>
  </nav>
);

export default Header;