import React from "react";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">GiftLink</a>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="/home.html">Home</a> 
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/app">Gifts</a> 
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
