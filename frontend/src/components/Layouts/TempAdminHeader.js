import React, {Component} from 'react'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import {Link} from 'react-router-dom'

export default class AdminHeader extends Component {

  render() {
    return (
      <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">
        <img src="https://firebasestorage.googleapis.com/v0/b/apurubook-storeage.appspot.com/o/Static-Images%2Flogo.png?alt=media&token=bcb7d0f3-9eef-412c-9c2b-deaf530a34fd"  width="30" height="30" class="d-inline-block align-top" alt=""/> 
        &nbsp;
        ApuruBook Admin
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <Link to="/" class="nav-link">Home <span class="sr-only">(current)</span></Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/admin/register">Admin Register</Link>
          </li>
        </ul>
      </div>
    </nav>
      </div>
    )
  }
}
