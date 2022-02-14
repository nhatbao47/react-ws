import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { fakeAuth } from "../Services/CommonService";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    fakeAuth.isAuthenticated = false;
    navigate('/login');
  }

  const { isAuthenticated, username } = fakeAuth;

  return (
    <nav className="navbar navbar-expand-lg bg-light navbar-light">
      <div className="navbar-brand">
        <img
          width="40"
          alt="React Logo"
          src="/logo192.png"
          className="mx-1"
        />
      </div>
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
          {isAuthenticated && (
            <li className="nav-item dropdown">
              <div className="d-inline-block">
                <button className="btn btn-link" id="dropdownMenu">
                  <i className="fa fa-user-circle-o" aria-hidden="true"></i> Username: {username}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenu">
                  <button className="dropdown-item" onClick={() => handleLogout()}>Log out</button>
                </div>
              </div>
            </li>
          )}
          {!isAuthenticated && (
            <li className="nav-item">
              <NavLink to="/login" className="nav-link">
                <i className="fa fa-sign-in" aria-hidden="true"></i> Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;