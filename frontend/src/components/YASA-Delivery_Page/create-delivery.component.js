import React, { Component } from 'react';
//import DatePicker from 'react-datepicker';
import "react-calendar/dist/Calendar.css";
import Calendar from 'react-calendar';
import axios from 'axios';

export default class CreateDelivery extends Component {
  constructor(props) {
    super(props);
    this.onChange_id = this.onChange_id.bind(this);    
    this.onChangeDestination = this.onChangeDestination.bind(this);
    this.onChangeMethod = this.onChangeMethod.bind(this);
    this.onChangeHandoverDate = this.onChangeHandoverDate.bind(this);
    this.onChangeReceiver = this.onChangeReceiver.bind(this);
    this.onChangeNoofbooks = this.onChangeNoofbooks.bind(this);
    this.onChangeDeliveryDate = this.onChangeDeliveryDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  
    this.state = {
      _id:'order',
      destination: '',
      method: '',
      handoverdate: new Date(),
      receiver: '',
      noofbooks: 0,
      deliverydate: new Date(),
      orders:[],
      singleOrder:""
    }
  }
      
  componentDidMount() {
    axios
      .get("http://localhost:8059/order")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            orders: response.data.map((order) => order._id),
            _id: response.data[0]._id,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  onChange_id(e) { 
    
    this.setState({_id: e.target.value})
    console.log('hello')
  
    axios
    .get(`http://localhost:8059/order/getorder/${e.target.value}`)
    .then((response) => {
      

      let totalQuantity = 0 ;
      response.data.order.items.map((item) => {

        totalQuantity = totalQuantity + item.quantity;

      })


        this.setState({
          singleOrder: response.data,
          receiver:response.data.order.customerName,
          destination:response.data.order.cutomerAddress,
          noofbooks:totalQuantity
        });
      
    })
    .catch((error) => {
      console.log(error);
    });
  
  }
  onChangeDestination(e) { this.setState({destination: e.target.value})}
  onChangeMethod(e) {this.setState({method: e.target.value})}
  onChangeHandoverDate(date) {this.setState({handoverdate: date})}
  onChangeReceiver(e) {this.setState({receiver: e.target.value})}
  onChangeNoofbooks(e) {this.setState({noofbooks: e.target.value})}
  onChangeDeliveryDate(date) {this.setState({deliverydate: date})}
    
  async onSubmit(e) {
    e.preventDefault();
    const delivery = {
      _id: this.state._id,
      destination: this.state.destination,
      method: this.state.method,
      handoverdate: this.state.handoverdate,
      receiver: this.state.receiver,
      noofbooks: this.state.noofbooks,
      deliverydate: this.state.deliverydate
    }

    console.log(delivery)
    await axios.post('http://localhost:8059/delivery/add', delivery)
    .then((res) => {
      alert('Delivery Added')
    })
    .catch((err) => {
      alert("Delivery Already")
      console.log(err)
    })
    
    //window.location = '/';
  }
      
  render() {
    return (
      <div className="pt-3">
        <div className="card shadow mb-4 w-100">
          <div className="card-header py-3">
            <h4 className="m-0 font-weight-bold text-primary">
              Add New Delivery
            </h4>
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit} className="text-color">
              <div className="form-group"> 
                <label>Order ID: </label>
                <select ref="userInput" required  className="form-control"
                onChange={this.onChange_id}>
                  <option value="order">
                      Select Order ID
                  </option>
                  {this.state.orders.map(function (order) {
                    return (
                      <option key={order} value={order}>
                        {order}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-group"> 
                <label>Destination: </label>
                <input type="text" required className="form-control" value={this.state.destination}
                onChange={this.onChangeDestination} disabled/>
              </div>
              <div className="form-group"> 
                <label>method: </label>
                <input  type="text" required className="form-control" value={this.state.method}
                onChange={this.onChangeMethod} />
              </div>
              <div className="form-group row">
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <label>Handover Date: </label>
                  <div>
                    <Calendar value={this.state.handoverdate} onChange={this.onChangeHandoverDate} />
                  </div>
                </div>
                <div className="col-sm-6">
                  <label>Delivery Date:</label>
                  <div>
                    <Calendar value={this.state.deliverydate} onChange={this.onChangeDeliveryDate} />
                  </div>
                </div>
              </div>
              <div className="form-group"> 
                <label>Receiver: </label>
                <input  type="text" required className="form-control" value={this.state.receiver}
                onChange={this.onChangeReceiver} disabled/>
              </div>
              <div className="form-group">      
                <label>Number of books: </label>
                <input type="number" required className="form-control disabled" value={this.state.noofbooks}
                onChange={this.onChangeNoofbooks} disabled/>
              </div>
              <div className="form-group">
                <input type="submit" value="ADD DELIVERY" className="btn btn-warning btn-block" />
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}