import React, { useState } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import StarRating from "stars-rating";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props) => {
   return <MuiAlert elevation={6} variant="filled" {...props} style={{ textAlign: 'center' }} />;
}

const Book = ({ bookId, bookTitle, bookPrice, averageRating, bookImage, translator }) => {
   const [open, setOpen] = useState(false);

   const productPage = () => {
      window.location = `/product/${bookId}`
   }

   const handleClose = (reason) => {
      if (reason === 'clickaway') {
         return;
      }
      setOpen(false);
   };

   const addToCart = async () => {
      const cartItem = {
        productId: bookId,
        price: bookPrice,
        quantity: 1,
        totalPrice: 1 * bookPrice,
        itemImage: bookImage
      }
      const config = {
         headers: {
            Authorization: localStorage.getItem("Authorization"),
            "content-type": "application/json",
         },
      };
      await axios.post(`http://localhost:8059/cart/add`, cartItem, config)
         .then(() => (

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} >
               <Alert severity="warning">
                  Please give your rating for product
               </Alert>
            </Snackbar>
         )).catch((error) => {
            console.log(error.message)
         })
   }

   return (
      <div style={{width: 260, paddingBottom: 15}}>
        <div class="card">
          <div style={{overflow: 'hidden', height: 300}}>
            <img src={bookImage} width={258} onClick={productPage}/>
          </div>
          <div class="content text-color p-2">
            <a class="header text-color " style={{fontSize: 19}}>{bookTitle}</a>
            <div class="description text-color">
              {translator}
            </div>
            <Typography component={'span'} variant={'body2'}>
              <div className="row" style={{ paddingLeft: 0 }}>
                <label>
                    <div style={{ pointerEvents: "none", paddingLeft: 12 }}>
                      <StarRating
                        count={5}
                        size={23}
                        value={averageRating}
                        color2={"#eb8a2f"}
                      />
                    </div>
                </label>
                <label style={{ fontSize: 18, paddingTop: 5, paddingLeft: 5 }}>
                    {averageRating}
                </label>
              </div>
            </Typography>
            <Button className="ui button" onClick={addToCart} style={{width:242, backgroundColor: "#ff8c00" }} startIcon= {<ShoppingCart />}>
              Add to Cart
            </Button>
          </div>
          <div class="extra content"></div>
        </div>
      </div>
   );

}

export default Book