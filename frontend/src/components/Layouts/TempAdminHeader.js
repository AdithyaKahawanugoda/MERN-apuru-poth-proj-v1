import React, {Component} from 'react'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import {Link} from 'react-router-dom'

export default class AdminHeader extends Component {

  render() {
    return (
      <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">ApuruBook Admin</a>
        <div class="collapse navbar-collapse" id="navbarNav">
          
        </div>
      </nav>
      </div>
    )
  }
}
