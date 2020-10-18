import React, { Component } from 'react';
import axios from 'axios';

 

export default class paymentMethod extends Component {
 // constructor(props) {
   // super(props);

    //this.onChange = this.onChange.bind(this);

     state = {

       value: "cash on delivery"

    };

    

    // onChange = e =>{

    //       this.setState({value: e.target.value});

    // }

  //}

  onChangeAddress(e) {
    this.setState({
      value: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const addr = {
      value: this.state.address
    }

    axios.post('http://localhost:5000/order/create',addr)
    .then(res => console.log(res.data));

  }

  render(){

    const {value} = this.state;

  return (
    <div><center> 
      <br/>
      <div>
      <h1>Payment Method</h1><br/>
       
        <label>
         
           <input type="radio"
                  value="  Cash on delivery"
                  onChange = {this.onChange}/>
            &nbsp;
        Cash on delivery   
       </label> 
  
       <br/>
       
       <label>
       <input type="radio"
                  value=" unavailable"
                  onChange = {this.onChange}
                  disabled     />
       &nbsp; <i> Unavailable</i>
       </label>
       </div>

       <div className="form-group">
            <input type="submit" value="OK" className="btn btn-primary"  />
          </div>

   </center> </div>
      
  );   
}
}