import React, {Component} from 'react'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';


export default class Header extends Component {

  render() {
    return (
      <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Features</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Pricing</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Disabled</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Request Book</a>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i><ShoppingCartIcon/></i>
              <span class="text ml-1">Cart</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i><PersonIcon /></i>
              <span class="text ml-1">My Account</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
      </div>
    )
  }
}
