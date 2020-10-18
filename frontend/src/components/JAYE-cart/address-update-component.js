import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
 

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
                
        <h4 class ="text-dark">Do you need to change your address?</h4><br/>
  
        <form onSubmit={this.onSubmit}>
          <div className="form-group" class ="text-dark">  
            <label>Address: </label><br/>
            <textarea 
                required
               className="form-control"
               class="col-sm-7"
                value={this.state.address}
                onChange={this.onChangeAddress}
                rows = "10"

                />
          </div>
          <br/><br/>
          <div className="form-group">
          <Button className="ui button" onClick={this.onChangeAddress} style={{width:242, backgroundColor: "#ff8c00" }}  >
             Change
            </Button>
          </div>
        </form>
      <br/>
      <div>
      <h4 class ="text-dark" >Payment Method</h4><br/></div>   
      <label class ="text-dark">
         
         <input type="radio"  
                value="  Cash on delivery"
                onChange = {this.onChange}/>
          &nbsp;
      Cash on delivery   
     </label> 
     <br/>
       
       <label class ="text-dark">
       <input type="radio"
                  value=" unavailable"
                  onChange = {this.onChange}
                  disabled     />
       &nbsp; <i> Unavailable</i>
       </label>
       <div className="form-group">
            <br/>
            <center><Button className="ui button" style={{width:242, backgroundColor: "#ff8c00" }}  >
             Next
            </Button> </center>
          </div>

      </div>
    )
  }
  }
