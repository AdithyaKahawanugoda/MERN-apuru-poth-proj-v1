import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from 'moment'
import Button from '@material-ui/core/Button'
import RefreshIcon from '@material-ui/icons/Refresh';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import UpdateDiscount from '../LIHI-Admin/UpdateDiscount'

export default class DiscountsList extends Component {
  constructor(props) {
    super(props);
    this.refreshTable = this.refreshTable.bind(this);
    this.deleteDiscount = this.deleteDiscount.bind(this);
    this.updateDiscount = this.updateDiscount.bind(this);
    this.generatePDF = this.generatePDF.bind(this)
    this.state = { 
      discounts: [],
      show: false,
      onHide: true,
      discountId: null
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8059/discounts/")
      .then((response) => {
        this.setState({ discounts: response.data.items });
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  generatePDF() {
    const pdfText = {
      discounts: this.state.discounts,
    };

    axios
      .post(
          "http://localhost:8059/discountreport/generatediscountlist",
        pdfText
      )
      .then(() => {
        alert("PDF Generated Successful");
      })
      .catch((err) => console.log(err.message));
  }


  async refreshTable() {
    await axios.get("http://localhost:8059/discounts/")
      .then((response) => {
        this.setState({ discounts: response.data.items });
      })
      .catch((error) => {
        alert(error.message)
      });
  }

  async updateDiscount(id) {
    const discountId = id  
    await this.setState({
      show: true,
      onHide: true,
      discountId: discountId
    })
  }

  deleteDiscount(id) {
    axios.delete("http://localhost:8059/discounts/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      discounts: this.state.discounts.filter((el) => el._id !== id),
    });
  }

  discountList() {
    return this.state.discounts.map((currentdiscount) => {
      return (
        <tr>
          <td>{currentdiscount.publishingTitle}</td>
          <td>{currentdiscount.marketPrice}</td>
          <td>{currentdiscount.percentage}</td>
          <td>{moment(currentdiscount.validDate).format('LL')}</td>
          <td>{currentdiscount.ammount}</td>
          <td>
            <IconButton aria-label="edit" size="small"
            onClick={() => {this.updateDiscount(currentdiscount._id);}}>
              <EditIcon/>
            </IconButton>
            <IconButton aria-label="delete" size="small"
            onClick={() => {this.deleteDiscount(currentdiscount._id);}}>
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
                Logged Discounts
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
                <Button className="w-100"  onClick={this.generatePDF} variant="contained" startIcon={<InsertDriveFileIcon/>} disableElevation>
                  generate discount report
                </Button> 
              </label>
              </div>
              <div className="table-responsive">
                <table className="table table-borderless table-sm">
                  <thead className="thead-light">
                    <tr>
                      <th>Publishing Title</th>
                      <th>Market Price</th>
                      <th>Percentage</th>
                      <th>Date</th>
                      <th>Ammount</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <div className="mt-2"></div>
                  <tbody>{this.discountList()}</tbody>
                </table>
              </div>
            </div>
        </div>
        <UpdateDiscount 
          show={this.state.show} 
          onHide={() => this.setState({show: false})} 
          discountId={this.state.discountId}
        />
      </div>
    );
  }
}
