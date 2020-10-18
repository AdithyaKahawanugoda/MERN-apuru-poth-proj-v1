
import React, { Component } from "react";
import axios from "axios";
//import DatePicker from "react-datepicker";
import Calendar from 'react-calendar';
import { Modal } from "react-bootstrap";
import "react-calendar/dist/Calendar.css";

export default class EditDelivery extends Component {
  constructor(props) {
    super(props);
    this.onChangeorderID = this.onChangeorderID.bind(this);  
    this.onChangeDestination= this.onChangeDestination.bind(this);
    this.onChangeMethod = this.onChangeMethod.bind(this);
    this.onChangeHandoverDate = this.onChangeHandoverDate.bind(this);
    this.onChangeReceiver = this.onChangeReceiver.bind(this);
    this.onChangeNoofbooks = this.onChangeNoofbooks.bind(this);
    this.onChangeDeliveryDate = this.onChangeDeliveryDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getDeliverID = this.getDeliverID.bind(this);

    this.state = {
      orderID: this.props.deliveryId,
      destination: '',
      method: '',
      handoverdate: new Date(),
      receiver: '',
      noofbooks: 0,
      deliverydate: new Date(),
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:8059/delivery/${this.props.deliveryId}`)
      .then((response) => {
        this.setState({
          orderID: response.data.OrderID,
          destination: response.data.destination,
          method: response.data.method,
          handoverdate: new Date(response.data.handoverdate),
          receiver: response.data.receiver,
          noofbooks: response.data.noofbooks,
          deliverydate: new Date(response.data.deliverydate)
        });
        
      })
      .catch(function (error) {
        console.log(error);
      });
      console.log(this.state.destination)
  }

  componentWillMount() {
    console.log('in edit order', this.state.orderID)
  }
  
  onChangeorderID(e) {
    this.setState({
      orderID: e.target.value
    })
  }
  
  onChangeDestination(e) {
    this.setState({
      destination: e.target.value
    })
  }

  onChangeMethod(e) {
    this.setState({
      method: e.target.value
    })
  }

  onChangeHandoverDate(date) {
    this.setState({
      handoverdate: date
    })
}

onChangeReceiver(e) {
    this.setState({
      receiver: e.target.value
    })
  }

  onChangeNoofbooks(e) {
    this.setState({
      noofbooks: e.target.value
    })
  }
  
  onChangeDeliveryDate(date) {
    this.setState({
      deliverydate: date
    })
  }

  getDeliverID(id) {
    alert(id)
  }


  async onSubmit(e) {
    e.preventDefault();

    const delivery = {
        destination: this.state.destination,
        method: this.state.method,
        handoverdate: this.state.handoverdate,
        receiver: this.state.receiver,
        noofbooks: this.state.noofbooks,
        deliverydate: this.state.deliverydate
      }
  

    console.log(delivery);

    await axios
      .post(
        "http://localhost:5000/delivery/update/" + this.props.match.params.id,
        delivery
      )
      .then((res) => console.log(res.data));

    alert("Update Success");
    window.location = "/";
  }

  render() {
    return (
      <div>
        {this.getDeliverID(this.props.deliveryId)}
        <Modal show={this.props.show} onHide={this.props.onHide} animation={true} size="lg"
        aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter" className="text-color">{this.props.deliveryId}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form onSubmit={this.onSubmit} className="text-color">  
            <div className="form-group">
              <label>Destination: </label>
              <input type="text" required className="form-control" value={this.state.destination}
              onChange={this.onChangeDestination} />
            </div>
            <div className="form-group">
              <label>Method: </label>
              <input type="text" required className="form-control" value={this.state.method}
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
              <input type="text" required className="form-control" value={this.state.receiver}
              onChange={this.onChangeReceiver} />
            </div>
            <div className="form-group">
              <label>Number of books:</label>
              <input type="number" required className="form-control" value={this.state.noofbooks}
              onChange={this.onChangeNoofbooks} />
            </div>
          <div className="form-group">
            <input
              type="submit"
              value="Edit Delivery"
              className="btn btn-warning"
            />
          </div>
        </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}