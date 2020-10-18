import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "../src/components/RAVB-Product_Page/product-page.css";
import ProductPage from "./components/RAVB-Product_Page/productpage.component";
import AdminHeader from './components/COMN-Admin_Page/RAVB-Admin_Dashboard/admin_header'
import AdminRegister from './components/Layouts/AdminRegister'
import DisplayBooks from "./components/NITH-Home_Page/display_products.component";
import Profile from "./components/HSKI-User_Profile/userprofile.component";
import SignUp from "./components/Layouts/UserRegister";
import Header from './components/Layouts/Header'
import UserLogin from './components/Layouts/UserLogin'
import CreateRequestbook from './components/NITH-RequestBook/create-requestbook.component'


function App() {
  return (
    <div>
      <Router>
        <Fragment>
        
          <section>
            <Switch>
              <Route path="/admin/register" component={AdminRegister} exact/>
              <Route path="/admin" component={AdminHeader} />
              
              <div>
                <Header/>
                  <Route path="/" component={DisplayBooks} exact />
                  <Route path="/me" component={Profile} exact />
                  <Route path="/signup" component={SignUp} exact />
                  <Route path="/product/:id" component={ProductPage} />
                  <Route path="/login" component={UserLogin} exact />
                  <Route path="/requestbook" component={CreateRequestbook} />
              </div>
            </Switch>
          </section>
        </Fragment>
      </Router>
    </div>
  );
}

export default App;
