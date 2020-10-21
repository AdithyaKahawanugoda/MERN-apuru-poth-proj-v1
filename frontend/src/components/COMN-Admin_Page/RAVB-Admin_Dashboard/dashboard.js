import React, {useState, useEffect, Component} from "react";
import LineChart from "../Charts/LineChart"
import AdminFeedback from "./AdminFeedbacks"
import axios from 'axios'
import DisplayRequests from '../NITH-RequestBook-Admin/DisplayRequests'
import NumberFormat from 'react-number-format';

export default class Dashboard extends Component{
  constructor(props) {
    super();

    this.state = {
      totalQuantity: 0,
      printCost: 0,
      extra: 0,
      userAccounts: 0
    }
  }

  async componentDidMount() {
    await axios.get('http://localhost:8059/inventory/product/all')
    .then((res) => {
      res.data.books.map((item) => {
        this.setState({
          totalQuantity: this.state.totalQuantity + item.quantity,
          printCost: this.state.printCost + item.charges.printCost,
          extra: this.state.extra + item.charges.other
        })
      })
    }).catch((error) => {})
    await axios.get('http://localhost:8059/user/getall')
    .then((res) => {
      this.setState({
        userAccounts: this.state.userAccounts + res.data.users.length
      })
    })
    .catch((err) => {})
  }

  render() {
    return (
      <div className="pt-2">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="text-color mb-0">Dashboard</h1>
        </div>
  
        <div className="row">
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-primary shadow-lg h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-light text-primary text-uppercase mb-1">
                      Stock Quantity
                    </div>
                    <div className="h5 mb-0 text-primary font-weight-bold text-gray-800">                      
                      <NumberFormat value={this.state.totalQuantity} displayType={'text'} thousandSeparator={true} />
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-calendar fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-success shadow-lg h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                      Total Print Cost
                    </div>
                    <div className="h5 mb-0 text-success font-weight-bold text-gray-800">
                      LKR <NumberFormat value={this.state.printCost} displayType={'text'} thousandSeparator={true} />
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-success shadow-lg h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">
                      Extra Experiences
                    </div>
                    <div className="h5 mb-0 text-danger font-weight-bold text-gray-800">
                      LKR <NumberFormat value={this.state.extra} displayType={'text'} thousandSeparator={true} />
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-warning shadow-lg h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                      Registerd User Accounts
                    </div>
                    <div className="h5 mb-0 text-warning font-weight-bold text-gray-800">
                      <NumberFormat value={this.state.userAccounts} displayType={'text'} thousandSeparator={true} />
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-comments fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <div className="row">
          <div className="col-xl-8 col-lg-7">
            <div className="card shadow mb-4">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">
                  Earnings Overview
                </h6>
              </div>
              <div className="card-body">
                <div className="chart-area">
                  <LineChart legendPosition="bottom"/>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <div className="row">
          <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Customer Requests</h6>
              </div>
              <div className="card-body">
                <DisplayRequests/>
              </div>
            </div>
          </div>
  
          <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">
                  Latest Customer Feedbacks
                </h6>
              </div>
              <div className="card-body">
                <AdminFeedback/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

