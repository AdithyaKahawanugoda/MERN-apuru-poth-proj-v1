import React, {useState} from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import CartPage from './CartPage'

const SingleCartItem = ({productId, productImage, productName, quantity, price, cartId}) => {
  const [newQuantity, setNewQuantity] = useState(quantity)
  const [netValue, setNewValue] = useState(price * quantity)

  const incrementQuantity = async () => {
    let q = newQuantity + 1
    let net = q * price
    setNewQuantity(q)
    setNewValue(net)

    const data = {
      quantity: q,
      price: price,
      totalPrice: net
    }

    const config = {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
        "content-type": "application/json",
      },
    };

    await axios.put(`http://localhost:8059/cart/update/${cartId}`, data, config)
    .then((res) => {
      console.log(res.data.status)
    })
    .catch((err) => {
      alert(err.message)
    })
  }

  const decrementQuantity = async () => {
    if (newQuantity > 1) {
      let dq = newQuantity - 1
      let dnet = dq * price
      setNewQuantity(dq)
      setNewValue(dnet)

      const data = {
        quantity: dq,
        price: price,
        totalPrice: dnet
      }
  
      const config = {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
          "content-type": "application/json",
        },
      };
  
      await axios.put(`http://localhost:8059/cart/update/${cartId}`, data, config)
      .then((res) => {
        console.log(res.data.status)
      })
      .catch((err) => {
        alert(err.message)
      })
    } else {
      setNewQuantity(1)
    }
  }

  const deleteItem = async () => {
    const config = {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
        "content-type": "application/json",
      },
    };

    await axios.delete(`http://localhost:8059/cart/delete/${cartId}`, config)
      .then((res) => {
        console.log(res.data.status)
        window.location = "/cart"
      })
      .catch((err) => {
        alert(err.message)
      })
  }

  return (
    <div>
      <div className="pb-2">
        <Paper style={{ padding: 10, borderRadius: 8 }} variant="outlined">
          <div className="row">
            <div className="col-lg-2">
              <img src={productImage} width={100}/>
            </div>
            <div className="col-lg-10">
              <div className="pl-lg-4">
                <h5 className="text-color d-inline">{productName}</h5>
                <h5 className="text-color">LKR {price}.00</h5>
                <h6 className="text-muted">Item Code - {productId}</h6>

                <div className="pt-lg-2">
                  <IconButton size="small" aria-label="add an alarm"
                  style={{background: "#ff8c00", marginRight: 8}} className="d-inline mb-2"
                  onClick={decrementQuantity}>
                    <RemoveIcon />
                  </IconButton>
                    <h3 className="text-color d-inline">{newQuantity}</h3>
                  <IconButton size="small" aria-label="add an alarm"
                  style={{background: "#ff8c00", marginLeft: 6}} className="d-inline mb-2"
                  onClick={incrementQuantity}>
                    <AddIcon />
                  </IconButton>
                  <h3 className="text-color font-weight-bold pt-lg-2 d-inline ml-5">LKR {netValue}.00</h3>
                </div>
                <div className="d-flex justify-content-end">
                  <IconButton size="medium" aria-label="add an alarm"
                  style={{background: "#e64a19", marginLeft: 6}} className="d-inline"
                  onClick={deleteItem}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  )
}

export default SingleCartItem