import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment'
import Button from '@material-ui/core/Button'
import RefreshIcon from '@material-ui/icons/Refresh';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import EditDelivery from './UpdateDelivery'

export default class DeliveryList extends Component {

  
  constructor(props) {
    super(props);
    this.deleteDelivery = this.deleteDelivery.bind(this)
    this.refreshTable = this.refreshTable.bind(this)
    this.updateDelivery = this.updateDelivery.bind(this)

    this.state = {
      deliveries: [],
      show: false,
      onHide: true,
      deliveryId: null
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8059/delivery/')
      .then(response => {
        this.setState({ deliveries: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  async refreshTable() {
    await axios.get('http://localhost:8059/delivery/')
    .then(response => {
      this.setState({ deliveries: response.data })
    })
    .catch((error) => {
      console.log(error);
    })
  }

  async updateDelivery(id) {
    const delId = id
    await this.setState({ 
      show: true, 
      onHide: true, 
      deliveryId: delId
    })
  }

  deleteDelivery(id) {
    axios.delete("http://localhost:8059/delivery/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      deliveries: this.state.deliveries.filter((el) => el._id !== id),
    });
  }

  

  deliveryList() {
    return this.state.deliveries.map((currentdelivery) => {
      return (
        <tr>
          <td>{currentdelivery._id}</td>
          <td>{currentdelivery.destination}</td>
          <td>{currentdelivery.method}</td>
          <td>{moment(currentdelivery.handoverdate).format('LL')}</td>
          <td>{currentdelivery.receiver}</td>
          <td>{currentdelivery.noofbooks}</td>
          <td>{moment(currentdelivery.deliverydate).format('LL')}</td>
          <td>
            <IconButton aria-label="edit" size="small"
            onClick={() => {this.updateDelivery(currentdelivery._id);}}>
              <EditIcon/>
            </IconButton>
            <IconButton aria-label="delete" size="small"
            onClick={() => {this.deleteDelivery(currentdelivery._id);}}>
              <DeleteIcon/>
            </IconButton>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="pt-3">
        <div className="card shadow mb-4 w-100">
          <div className="card-header py-3">
          <h4 className="m-0 font-weight-bold text-primary">
            Delivery Details
          </h4>
          </div>
          <div className="card-body">
          <div className="row mx-auto">
              <lable>
                <Button className="w-100" variant="contained" onClick={this.refreshTable} startIcon={<RefreshIcon/>} disableElevation>
                  refresh table
                </Button> 
              </lable>
              &nbsp;&nbsp;&nbsp;
              <label>
                <Button className="w-100" variant="contained" startIcon={<InsertDriveFileIcon/>} disableElevation>
                  generate discount report
                </Button> 
              </label>
              </div>
            <table className="table table-borderless table-sm">
              <thead className="thead-light">
                <tr>
                  <th>orderID</th>
                  <th>Destination</th>
                  <th>Method</th>
                  <th>Handover Date</th>
                  <th>Receiver</th>
                  <th>Number of Books</th>
                  <th>Delivery Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{this.deliveryList()}</tbody>
            </table>
          </div>
        </div>
        <EditDelivery 
          show={this.state.show} 
          onHide={() => this.setState({show: false})} 
          deliveryId={this.state.deliveryId}
        />
      </div>
    )
  }
}
