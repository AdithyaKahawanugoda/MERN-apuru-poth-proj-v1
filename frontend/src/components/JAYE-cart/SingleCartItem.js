import React, {useState} from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const SingleCartItem = ({productId, productImage, productName, quantity, price, cartId}) => {
  const [newQuantity, setNewQuantity] = useState(quantity)
  const [netValue, setNewValue] = useState(price * quantity)

  const incrementQuantity = async () => {
    let q = newQuantity + 1
    let net = q * price
    setNewQuantity(q)
    setNewValue(net)

    await axios.put(``)
  }

  const decrementQuantity = () => {
    if (newQuantity > 1) {
      let dq = newQuantity - 1
      let dnet = dq * price
      setNewQuantity(dq)
      setNewValue(dnet)
    } else {
      setNewQuantity(1)
    }
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
                <h5 className="text-color">{productName}</h5>
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
              </div>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  )
}

export default SingleCartItem