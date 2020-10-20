import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./dashboard";
import Inventory from '../Inventory/Inventory'
import AdminProfile from "../LIHI-Admin/AdminProfile"
import DeliveryPage from '../YASA-Admin/DeliveryPage'
import Discount from '../LIHI-Admin/DiscountPage'
import SendEmail from '../../YASA-Delivery_Page/emaildelivery.component'
import AdvertisementPage from '../BINU-Advertisement/AdvertisementPage'
import {Link} from 'react-router-dom'
import './style.css'


const AdminHeader = () => {

  useEffect(() => {
    if (localStorage.getItem('role') !== 'admin') {
      localStorage.removeItem('role')
      localStorage.removeItem('Authorization')
      window.location = '/adminlogin'
    }
  })

  const adminLogout = () => {
    localStorage.removeItem('role')
    localStorage.removeItem('Authorization')
    window.location = '/adminlogin'
  }

  return (
    <div id="page-top">

    <nav class="navbar navbar-expand-lg navbar-dark bg-mattBlackLight fixed-top">
    <button class="navbar-toggler sideMenuToggler" type="button">
      <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand" href="#">ApuruBook</a>
    </nav>
    <div class="wrapper d-flex">
      <div class="sideMenu bg-mattBlackLight">
        <div class="sidebar">
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link to="/admin" class="admin-nav-link px-2" style={{textDecoration: 'none'}}>
                <i class="material-icons icon">
                  insert_chart
                </i>
                <span class="text">Dashboard</span>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/admin/profile" class="admin-nav-link px-2" style={{textDecoration: 'none'}}>
                <i class="material-icons icon">
                  person
                </i>
                <span class="text">Profile</span>
              </Link>
            </li>
            <li class="">
              <Link to='/admin/inventory' class="admin-nav-link px-2" style={{textDecoration: 'none'}}>
                <i class="material-icons icon"> store </i>
                <span class="text">Inventory</span>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/admin/delivery" class="admin-nav-link px-2" style={{textDecoration: 'none'}}>
                <i class="material-icons icon">
                  local_shipping
                </i>
                <span class="text">Delivery</span>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/admin/discount" class="admin-nav-link px-2" style={{textDecoration: 'none'}}>
                <i class="material-icons icon">
                  local_offer
                </i>
                <span class="text">Discount</span>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/admin/advertisement" class="admin-nav-link px-2" style={{textDecoration: 'none'}}>
                <i class="material-icons icon">
                  cast
                </i>
                <span class="text">Advertisement</span>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="#" class="admin-nav-link px-2 " style={{textDecoration: 'none'}}>
                <i class="material-icons icon expandView sideMenuToggler">
                  view_list           
                </i>
                <span class="text">Resize</span>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="#" class="admin-nav-link px-2 " style={{textDecoration: 'none'}} onClick={adminLogout}>
                <i class="material-icons icon expandView sideMenuToggler">  
                  exit_to_app        
                </i>
                <span class="text">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div class="content">
        <main>
          <div class="container-fluid">
            <Fragment>
              <section>
                <Switch>
                  <Route exact path="/admin" component={Dashboard}/>
                  <Route exact path="/admin/inventory" component={Inventory}/>
                  <Route exact path="/admin/profile" component={AdminProfile}/>
                  <Route exact path="/admin/delivery" component={DeliveryPage}/>  
                  <Route exact path="/admin/discount" component={Discount}/>     
                  <Route exact path="/admin/sendemail" component={SendEmail}/>   
                  <Route exact path="/admin/advertisement" component={AdvertisementPage} />    
                </Switch>
              </section>
            </Fragment>
          </div>
        </main>
      </div>
    </div>

    </div>
    
  );
  
};

export default AdminHeader;
