import React, { useEffect, useState } from "react";
import axios from "axios";
import StarRating from "stars-rating";
import Button from "@material-ui/core/Button";
import FadeIn from 'react-fade-in'
import Snackbar from '@material-ui/core/Snackbar'

import { makeStyles } from "@material-ui/core/styles";
import Wishlist from "@material-ui/icons/Bookmark";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import BuyNow from "@material-ui/icons/MonetizationOnRounded";
import ProductImage from "./productimage.component";
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0),
    marginRight: 9,
    marginBottom: 9,
    borderRadius: 5
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(150),
      height: theme.spacing(46),
    },
    borderRadius: 20
  },
}));

const ProductInfromation = (productId) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [publishingTitle, setPublishingTitle] = useState(null);
  const [originalTitle, setOriginalTitle] = useState(null);
  const [translator, setTranslator] = useState(null);
  const [originalAuthor, setOriginalAuthor] = useState(null);
  const [ISBN, setISBN] = useState(null);
  const [license, setLicense] = useState(null);
  const [quentity, setQuentity] = useState(null);
  const [edition, setEdition] = useState(null);
  const [press, setPress] = useState(null);
  const [proofReader, setProofReader] = useState(null);
  const [coverDesigner, setCoverDesigner] = useState(null);
  const [weight, setWeight] = useState(null);
  const [marketPrice, setMarketPrice] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [averageRating, setAverageRating] = useState(null);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    setLoading(true);
    const fetchProductData = async () => {
      try {
        console.log(productId.productId)
        await axios
          .get(`http://localhost:8059/inventory/product/${productId.productId}`)
          .then((res) => {
            setPublishingTitle(res.data.product.publishingTitle);
            setOriginalTitle(res.data.product.originalTitle);
            setTranslator(res.data.product.translator);
            setOriginalAuthor(res.data.product.originalAuthor);
            setISBN(res.data.product.ISBN);
            setLicense(res.data.product.license);
            setQuentity(res.data.product.quentity);
            setEdition(res.data.product.edition);
            setPress(res.data.product.press);
            setProofReader(res.data.product.proofReader);
            setCoverDesigner(res.data.product.coverDesigner);
            setWeight(res.data.product.weight);
            setMarketPrice(res.data.product.marketPrice);
            setCoverImage(res.data.product.bookImage);
            setAverageRating(res.data.product.averageRating);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err.message);
          });
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchProductData();
  }, []);

  const addToWishList = async () => {
    const config = {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    };
    const data = {}
    await axios.post(`http://localhost:8059/wishlist/add/${productId.productId}`,data,config)
    .then((res) => {
      setOpen(true)
    })
    .catch((err) => {
      alert(err.message)
    })
  }

  const addToCart = () => { }
  if (loading) {
    return <div className="d-flex justify-content-center" style={{ paddingTop: 400 }}>
      <CircularProgress />
    </div>
  }

  return (
    <div className="container">
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}>
    <div className="alert alert-success">
      Item Added to Wishlist
    </div>
  </Snackbar>
      <div style={{ paddingTop: 30 }}>
        <div className="row">
          <div className="col-lg-8 col-sm-12 col-md-8 col-xs-12 product-col">
              <div
                style={{
                  fontSize: 50,
                }}
              >
                {publishingTitle} {/*publish title*/}
              </div>
              <div style={{ fontSize: 25 }}>{originalAuthor}</div>
              <div className="row" style={{ paddingLeft: 17 }}>
                <label
                  style={{
                    fontSize: 20,
                    paddingTop: 9,
                  }}
                >
                  {averageRating} {/*average rating*/}
                </label>
                <label>
                  <div style={{ pointerEvents: "none", paddingLeft: 12 }}>
                    <StarRating
                      count={5}
                      size={30}
                      value={averageRating}
                      color1={"#696969"}
                      color2={"#000000"}
                    />
                  </div>
                </label>
              </div>
              <div style={{ fontSize: 20, paddingBottom: 15 }}>
                Quantity: {quentity}
              </div>
              <div style={{ fontSize: 24, paddingBottom: 15 }}>
                Price: Rs.{marketPrice}
              </div>
              <div style={{ paddingBottom: 55 }}>
                <Button
                  onClick={addToWishList}
                  variant="outlined"
                  className={classes.button}
                  startIcon={<Wishlist />}
                >
                  {open === true ? 'Add to Wishlist' : "Wishlist"}
              </Button>
                <Button
                  variant="outlined"
                  className={classes.button}
                  startIcon={<ShoppingCart />}
                >
                  Add to Cart
              </Button>
                <Button
                  variant="outlined"
                  className={classes.button}
                  startIcon={<BuyNow />}
                >
                  Buy Now
              </Button>
              </div>
            {/* Other product details */}
              <div className={classes.root}>
                <Paper variant="outlined" style={{ borderRadius: 5 }}>
                  <div className="p-4">
                    <h4>Book Information</h4>
                    <table style={{ fontSize: 18 }}>
                      <tbody>
                        <tr>
                          <td>Original Title</td>
                          <td style={{ paddingLeft: 18 }}>: {originalTitle}</td>
                        </tr>
                        <tr>
                          <td>Translator</td>
                          <td style={{ paddingLeft: 18 }}>: {translator}</td>
                        </tr>
                        <tr>
                          <td>Original Author</td>
                          <td style={{ paddingLeft: 18 }}>: {originalAuthor}</td>
                        </tr>
                        <tr>
                          <td>ISBN</td>
                          <td style={{ paddingLeft: 18 }}>: {ISBN}</td>
                        </tr>
                        <tr>
                          <td>License</td>
                          <td style={{ paddingLeft: 18 }}>: {license}</td>
                        </tr>
                        <tr>
                          <td>Edition</td>
                          <td style={{ paddingLeft: 18 }}>: {edition}</td>
                        </tr>
                        <tr>
                          <td>Press</td>
                          <td style={{ paddingLeft: 18 }}>: {press}</td>
                        </tr>
                        <tr>
                          <td>Proof Reader</td>
                          <td style={{ paddingLeft: 18 }}>: {proofReader}</td>
                        </tr>
                        <tr>
                          <td>Cover Designer</td>
                          <td style={{ paddingLeft: 18 }}>: {coverDesigner}</td>
                        </tr>
                        <tr>
                          <td>Book Weight</td>
                          <td style={{ paddingLeft: 18 }}>: {weight}g</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Paper>
              </div>
          </div>
          <div className="col-lg-4 col-sm-12 col-md-8 col-xs-12 image">
            <ProductImage coverImage={coverImage} />
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default ProductInfromation;
