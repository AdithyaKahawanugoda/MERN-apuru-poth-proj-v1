import React, { Component } from 'react';
import axios from 'axios';
import SingleCartItem from './SingleCartItem'
import Paper from '@material-ui/core/Paper';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Button from "@material-ui/core/Button";
import AutorenewIcon from '@material-ui/icons/Autorenew';
import IconButton from '@material-ui/core/IconButton';
import {Link} from 'react-router-dom'
import CheckOutPage from './CheckoutPage'

export default class CartPage extends Component {
  constructor(props) {
    super()
    this.calculateTotal = this.calculateTotal.bind(this);
    this.totalCal = this.totalCal.bind(this);
    this.checkoutpage = this.checkoutpage.bind(this);

    this.state = {
      cartItems: [],
      totalPrice: 0
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
      alert(err.message)
    })
    this.calculateTotal()
  }

  async totalCal() {
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
      alert(err.message)
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

  checkoutpage() {
    window.location = "/checkout"
  }

  render() {
    return (
      <div className="container">
        <div className="pt-3">
          {this.state.cartItems.length > 0 ? 
            <div className="row">
            <div className="col-lg-7">
              {this.state.cartItems.map((item) => (
                <SingleCartItem key={item._id} 
                  productId={item.productId}
                  productImage={item.productImage}
                  productName={item.productName}
                  quantity={item.quantity}
                  price={item.productPrice}
                  cartId={item._id}
                />
              ))}
            </div>

            <div className="col-lg-5">
              <Paper style={{ padding: 10, borderRadius: 8 }} variant="outlined">
                <h3 className="text-color font-weight-bold">Order Summary</h3>
                <h5 className="text-color d-inline">Total Items</h5>
                <h5 className="text-color d-inline" style={{marginLeft: 280}}>{this.state.cartItems.length}</h5>
                <h4 className="text-color pt-3">Total Price</h4>
                <h4 className="text-color d-inline">LKR {this.state.totalPrice}.00</h4>
                <IconButton size="small" aria-label="add an alarm"
                style={{background: "#ff8c00", marginLeft: 225}} className="d-inline mb-2" onClick={this.totalCal}>
                  <AutorenewIcon/>
                </IconButton>

                <Button variant="contained" className="w-10" style={{background: "#ff8c00", width: 100+"%"}}
                startIcon={<ShoppingBasketIcon />} disableElevation type="submit"
                onClick={this.checkoutpage}>request this book</Button>

              </Paper>  
            </div>
          </div> : ""}
        </div>
      </div>
    )
  }
}