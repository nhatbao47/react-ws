import React from "react";
import { Dropdown } from "react-bootstrap";
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
        {isAuthenticated && (
          <Dropdown className="user-dropdown">
            <Dropdown.Toggle id="dropdown">
              <i className="fa fa-user-circle-o" aria-hidden="true"></i> Username: {username}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleLogout()}>
                Log out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
        {!isAuthenticated && (
          <ul className="nav navbar-nav login-nav-item">
            <li className="nav-item">
              <NavLink to="/login" className="nav-link">
                <i className="fa fa-sign-in" aria-hidden="true"></i> Login
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Header;