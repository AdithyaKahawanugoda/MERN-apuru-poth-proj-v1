import React, {Component} from 'react'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import {Link} from 'react-router-dom'

export default class Header extends Component {

  render() {
    return (
      <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">ApuruBook Publishers</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <Link to="/" class="nav-link">Home <span class="sr-only">(current)</span></Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/requestbook">Request Book</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/login">Login</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/signup">Sign Up</Link>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <Link to="/cart" class="nav-link">
              <i><ShoppingCartIcon/></i>
              <span class="text ml-1">Cart</span>
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/me">
              <i><PersonIcon /></i>
              <span class="text ml-1">My Account</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
      </div>
    )
  }
}
