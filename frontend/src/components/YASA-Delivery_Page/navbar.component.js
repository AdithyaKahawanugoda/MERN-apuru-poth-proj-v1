import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-expand-sm bg-danger navbar-dark">
        <Link to="/" className="navbar-brand">Delivery Tracker</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Deliveries</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Create Delivery </Link>
          </li>
          <li className="navbar-item">
          <Link to="" className="nav-link"> </Link>
          </li>
          <li className="navbar-item">
          <Link to="/emaildelivery" className="nav-link">Send Emails </Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}