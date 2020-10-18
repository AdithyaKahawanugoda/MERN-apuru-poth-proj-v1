import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class address extends Component {
  constructor(props) {
    super(props);

    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    //this.paymentPage = this.paymentPage.bind(this)

    this.state = {
      address: ''
    }
  }

  onChangeAddress(e) {
    this.setState({
      address: e.target.value
    })
  }

  // paymentPage() {
  //   window.location="./components/paymentMethod-component"
  // }

  onSubmit(e) {
    e.preventDefault();

    const addr = {
      address: this.state.address
    }

    console.log(address);

  //   axios.post('http://localhost:5000/users/add', user)
  //  .then(res => console.log(res.data));

    // this.setState({
    //   address: ''
    // })
 }

  render() {
    return (
      <div>
        <br/><br/>
        <h3>Do you need to change your address?</h3><br/>
         
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Address: </label>
            <textarea 
                required
                className="form-control"
                value={this.state.address}
                onChange={this.onChangeAddress}
                rows = "10"

                />
          </div>
          <br/><br/>
          <div className="form-group">
            <input type="submit" value="Change" className="btn btn-primary"  />
          </div>
          
          <div className="form-group">
            <br/>
            <center><Link to= "/paymentMethod" exact ><input type="submit" value="Next" className="btn btn-primary" /></Link></center>
          </div>
        </form>

      </div>
    )
  }
  }
