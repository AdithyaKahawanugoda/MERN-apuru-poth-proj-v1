import React, { Component } from 'react';
import axios from 'axios';
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import Typography from '@material-ui/core/Typography'
import Snackbar from '@material-ui/core/Snackbar'

export default class DisplayWishlist extends Component {
  constructor(props) {
    super();
    this.generateWishListReport = this.generateWishListReport.bind(this)
    this.displayWishListItems = this.displayWishListItems.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.handleClose = this.handleClose.bind(this)

    this.state = {
      wishlist: [],
      open: false
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

  handleClose(reason){
    if (reason === 'clickaway') {
      return;
    }
    this.setState({open: false})
  };

  async deleteItem(id) {
    const config = {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    };
    await axios.delete(`http://localhost:8059/wishlist/delete/${id}`, config)
    .then((res) => {
      this.setState({open: true})
    })
    .catch((err) => {
      alert(err.message)
      console.log(err)
    })
    this.setState({
      wishlist: this.state.wishlist.filter((element) => element._id !== id)
    })
  }

  async generateWishListReport() {
    const obj = {
      wishlist: this.state.wishlist
    }
    await axios.post('http://localhost:8059/wishlistreport/generatewishlist', obj)
    .then((res) => {
      alert('Thank you for Downloaded!')
    })
    .catch((err) => {
      console.log(err.message)
    })
  }

  displayWishListItems() {
    return (
      <div className="row" style={{ paddingTop: 15 }}>
        {this.state.wishlist.map((item) => (
          <div key={item._id} className="col-lg-3 col-md-6 col-sm-2">
            <div style={{width: 230, paddingBottom: 15}}>
            <div class="card">
              <div style={{overflow: 'hidden', height: 270}}>
                <img src={item.coverImage} width={230}/>
              </div>
              <div class="content text-color p-2">
                <a class="header text-color " style={{fontSize: 19}}>
                {item.productName.length > 13 ? <div>{item.productName.substr(0, 14)}...</div> : item.productName}
                </a>
                <Typography component={'span'} variant={'body2'}>
                  <div className="text-color" style={{fontSize: 16, paddingBottom: 8}}>LKR {item.productPrice}.00</div>
                </Typography>
              </div>
              <Button variant="contained" className="w-10 mb-2 ml-2 mr-2" style={{background: "#ff8c00", width: 92+"%"}}
                startIcon={<ShoppingCart />} disableElevation type="submit">add to cart</Button>
              <Button variant="contained" className="w-10 mb-2 ml-2 mr-2" style={{background: "#e64a19", width: 92+"%"}}
                startIcon={<DeleteIcon />} disableElevation type="submit" onClick={() => {this.deleteItem(item._id);}}>remove</Button>
              <div class="extra content"></div>
            </div>
          </div>
        </div>
        ))}
      </div>
    )
  }

  render() {
    return (
      <div>
        <h2 className="text-color">My Wishlist</h2>
        <Snackbar open={this.state.open} autoHideDuration={2000} onClose={this.handleClose} anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}>
          <div className="alert alert-danger">
            Item Deleted
          </div>
        </Snackbar>
        <Button className="w-25" variant="contained" startIcon={<InsertDriveFileIcon/>} disableElevation onClick={this.generateWishListReport}>
          get my wishlist items
        </Button>
        {this.displayWishListItems()}
      </div>
    )
  }
}
