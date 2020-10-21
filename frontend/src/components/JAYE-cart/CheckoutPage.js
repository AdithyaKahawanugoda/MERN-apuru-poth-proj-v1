import React, { Component } from 'react';
import axios from 'axios';
import Button from "@material-ui/core/Button";
import MenuBookIcon from '@material-ui/icons/MenuBook';

export default class CheckOutPage extends Component {
  constructor(props) {
    super(props);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.submitCheckout = this.submitCheckout.bind(this);

    this.state = {
      cartItems: [],
      totalPrice: 0,
      userName: "",
      userEmail: "",
      userPhone: "",
      address1: "",
      address2: "",
      city: "",
      province: "",
      postalCode: "",
      country: "",
      description: "",
    }
  }

  async componentDidMount() {
    const config = {
      headers: {
        Authorization: localStorage.getItem("Authorization")
     },
    }
    await axios.get('http://localhost:8059/cart/display', config)
    .then((res) => {
      this.setState({cartItems: res.data.cart})
    })
    .catch((err) => {
      console.log(err.message)
    })

    await axios.get('http://localhost:8059/user/profile', config)
    .then((res) => {
      this.setState({
        userName: res.data.user.name,
        userEmail: res.data.user.email,
        userPhone: res.data.user.phoneNumber,
        address1: res.data.user.address_line_1,
        address2: res.data.user.address_line_2,
        city: res.data.user.city,
        province: res.data.user.area_province,
        country: res.data.user.country,
        postalCode: res.data.user.postal_code
      })
    })
    .catch((err) => {
      console.log(err.message)
    })
    this.calculateTotal()
  }

  calculateTotal() {
    let total = 0
    this.state.cartItems.map((item) => {
      total = total + item.totalPrice
      console.log(total)
    })
    this.setState({totalPrice: total})
  }

  async submitCheckout(e) {
    e.preventDefault()
    const config = {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    };
    const data = {
      cartItems: this.state.cartItems,
      totalPrice: this.state.totalPrice,
      description: this.state.description
    }
    await axios.post('http://localhost:8059/order/create', data, config)
    .then((res) => {
      alert('success')
      window.location="/me"
    })
    .catch((err) => {
      console.log(err)
    })
  }

  render() {
    return (
      <div className="container">
        <div className="pt-5">
        <div className="card o-hidden border-0 shadow-lg my-5">
          <div className="card-body p-0">
            <div className="row">
              <div className="col-12">
                <div className="d-flex justify-content-center">
                  <h1 className="h3 text-color p-4">Please Check Details Before Purchase</h1>
                </div>
                <h3 className="text-color d-inline pl-5 font-weight-bold">Total Price - LKR {this.state.totalPrice}.00</h3>
                <h5 className="text-color pl-5">Number of Items - {this.state.cartItems.length}</h5>
                <form className="user pl-5 pr-5 pb-5" onSubmit={this.submitCheckout}>
                  <div className="form-group row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                      <input type="text" className="form-control form-control-user" value={this.state.userName}  required/>
                      <small className="text-muted">Your name</small>
                    </div>
                    <div className="col-sm-6">
                      <input type="text" className="form-control form-control-user" value={this.state.userEmail} required/>
                      <small className="text-muted">please check your email</small>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                      <input type="text" className="form-control form-control-user" value={this.state.userPhone}  required/>
                      <small className="text-muted">check your phone number</small>
                    </div>
                    <div className="col-sm-6">
                      <input type="text" className="form-control form-control-user" value={this.state.postalCode} required
                      onChange={e => this.setState({postalCode: e.target.value})}/>
                      <small className="text-muted">please check your postal code</small>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-4">
                      <input type="text" className="form-control form-control-user" value={this.state.address1} required/>
                      <small className="text-muted">address 1</small>
                    </div>
                    <div className="col-sm-4">
                      <input type="text" className="form-control form-control-user" value={this.state.address2} required/>
                      <small className="text-muted">address 2</small>
                    </div>
                    <div className="col-sm-4 mb-3 mb-sm-0">
                      <input type="text" className="form-control form-control-user" value={this.state.city}  required/>
                      <small className="text-muted">check your city</small>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                      <input type="text" className="form-control form-control-user" value={this.state.province}  required/>
                      <small className="text-muted">check your province</small>
                    </div>
                    <div className="col-sm-6">
                      <input type="text" className="form-control form-control-user" value={this.state.country} required/>
                      <small className="text-muted">please check your country</small>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="exampleFormControlTextarea1" className="text-color">Add additional details if you want to</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                    onChange={(e) => {this.setState({description: e.target.value})}}></textarea>
                  </div>
                  <Button variant="contained" className="w-10" style={{background: "#ff8c00", width: 100+"%"}}
                  startIcon={<MenuBookIcon />} disableElevation type="submit">confirm checkout</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    )
  }
}