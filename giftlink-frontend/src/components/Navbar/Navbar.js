
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <Link className="navbar-brand" to="/">GiftLink</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="/home.html">Home</a> 
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/app">Gifts</a> 
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/app/search">Search</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
