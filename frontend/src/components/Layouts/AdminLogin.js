import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import SignUp from '../Layouts/UserRegister'
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import Button from "@material-ui/core/Button";
import AdminHeader from '../Layouts/TempAdminHeader'

export default class AdminLogin extends Component {
  constructor(props) {
    super(props);
    this.userLoginSubmit = this.userLoginSubmit.bind(this)

    this.state = {
      email: "",
      password: "",
      token: "",
      role: ""
    }
  }

  async userLoginSubmit(e) {
    e.preventDefault()
    const userData = {
      email: this.state.email,
      password: this.state.password
    }

    await axios.post('http://localhost:8059/adminprofile/adminlogin', userData)
    .then((res) => {
      this.setState({
        token: res.data.token
      })
      localStorage.setItem("Authorization", res.data.token)
      localStorage.setItem("role", res.data.admin.role)
      window.location = "/admin"
    })
    .catch((err) => {
      console.log(err)
    })
  }

  render() {
    return (
      <div>
        <AdminHeader/>
        <div className="container" style={{width: "auto", marginTop: 120}}>
        <div className="card o-hidden border-0 shadow-lg my-5">
          <div className="card-body p-0">
            <div className="row">
              <div className="col-lg-5 d-none d-lg-block bg-admin-login"></div>
              <div className="col-lg-7">
                <div className="p-5">
                  <div className="text-center text-color pt-5">
                    <h1 className="h4 text-gray-900 mb-4">Login As Admin</h1>
                  </div>
                  <form className="user" onSubmit={this.userLoginSubmit}>
                    <div className="form-group">
                      <input type="email" className="form-control form-control-user" placeholder="Email Address"
                      onChange={e => this.setState({ email: e.target.value })} required/>
                    </div>
                    <div className="form-group">
                      <input type="password" className="form-control form-control-user" placeholder="Password"
                      onChange={e => this.setState({ password: e.target.value })} required/>
                    </div>
                    <br/>
                    <Button variant="contained" className="w-10" style={{background: "#ff8c00", width: 100+"%"}}
                    startIcon={<LockOpenOutlinedIcon />} disableElevation type="submit">login</Button>     
                  </form>
                  <hr/>
                  <div className="text-center">
                    <a className="small" href="forgot-password.html">Forgot Password?</a>
                  </div>
                  <div className="text-center">
                    <Link to="/signup">
                      <a className="small">Create New Admin Account</a>
                    </Link>
                  </div>
                  <div className="text-center pb-5">
                    <Link to="/login">
                      <a className="small">Login As User</a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}