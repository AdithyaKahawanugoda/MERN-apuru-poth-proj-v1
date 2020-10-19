import React, { Component } from 'react';
import axios from 'axios';
import SingleCartItem from './SingleCartItem'

export default class CartPage extends Component {
  constructor(props) {
    super()

    this.state = {
      cartItems: []
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
  }

  render() {
    return (
      <div className="container">
        <div className="pt-3">
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

            <div className="col-lg-5"></div>
          </div>
        </div>
      </div>
    )
  }
}