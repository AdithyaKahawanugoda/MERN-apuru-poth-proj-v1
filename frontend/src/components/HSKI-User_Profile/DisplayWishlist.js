import React, { Component } from 'react';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import SingleWishList from './SingleWishList'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

export default class DisplayWishlist extends Component {
  constructor(props) {
    super();
    this.generateWishListReport = this.generateWishListReport.bind(this)

    this.state = {
      wishlist: []
    }
  }

  async componentDidMount() {
    const config = {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    };

    await axios.get('http://localhost:8059/wishlist/display', config)
    .then((res) => {
      this.setState({wishlist: res.data.wishlist})
    })
    .catch((err) => {
      alert(err.message)
    })
  }

  generateWishListReport() {

  }

  render() {
    return (
      <div>
        <h2 className="text-color">My Wishlist</h2>
        <Button className="w-25" variant="contained" startIcon={<InsertDriveFileIcon/>} disableElevation onClick={this.generateWishListReport}>
          get my wishlist items
        </Button>
        <div className="row" style={{ paddingTop: 15 }}>
          {this.state.wishlist.map((item) => (
            <div key={item._id} className="col-lg-3 col-md-6 col-sm-2">
              <SingleWishList
                bookName={item.productName}
                bookPrice={item.productPrice}
                bookId={item.productId}
                bookImage={item.coverImage}
              />
            </div>
          ))}
        </div>
      </div>
    )
  }
}
