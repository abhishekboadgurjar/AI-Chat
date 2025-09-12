import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const { userToken, logout } = useContext(AppContext);

  return (
    <nav className="navbar">
      <h2 className="logo">AI Chat Website</h2>
      <div>
        {userToken ? (
          <>
            <Link to="/chat">Chat</Link>
            <Link to="/history">History</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
