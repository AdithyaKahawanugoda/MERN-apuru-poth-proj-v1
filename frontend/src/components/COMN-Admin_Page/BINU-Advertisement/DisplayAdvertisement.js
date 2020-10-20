import React, { Component } from "react";
import axios from "axios";
import moment from 'moment'
import Button from '@material-ui/core/Button'
import RefreshIcon from '@material-ui/icons/Refresh';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


import UpdateAdvertisement from "./UpdateAdvertisement"

export default class DisplayAdvertisement extends Component {


  constructor(props) {
    super(props);
    this.refreshTable = this.refreshTable.bind(this);
    this.deleteAdvertisement = this.deleteAdvertisement.bind(this);
    this.updateAdvertisement = this.updateAdvertisement.bind(this);
    this.generatePDF = this.generatePDF.bind(this)
    this.state = { 
      advertisements: [],
      show: false,
      onHide: true,
      advertisementId: null
    };
  }

  
  componentDidMount() {

 
    axios
      .get("http://localhost:8059/advertisement/all")
      .then((response) => {
        this.setState({ advertisements: response.data.advertisement });
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  generatePDF() {
    const pdfText = {
      advertisements: this.state.advertisements,
    };

    axios
      .post(
          "http://localhost:8059/advertismentreport/generateadvertisementlist",
        pdfText
      )
      .then(() => {
        alert("PDF Generated Successful");
      })
      .catch((err) => console.log(err.message));
  }

  async refreshTable() {
    await axios.get("http://localhost:8059/advertisement/all/")
      .then((response) => {
        this.setState({ advertisements: response.data.advertisement });
      })
      .catch((error) => {
        alert(error.message)
      });
  }


  async updateAdvertisement(id) {
    const advertisementId = id  
    await this.setState({
      show: true,
      onHide: true,
      advertisementId: advertisementId
    })
  }


  deleteAdvertisement(id) {
    axios.delete("http://localhost:8059/advertisement/delete/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      advertisements: this.state.advertisements.filter((el) => el._id !== id),
    });
  }


  advertisementList() {
    return this.state.advertisements.map((currentadvertisement) => {
      return (
        <tr>
          <td>{currentadvertisement.title}</td>
          <td>{moment(currentadvertisement.publisheddate).format('LL')}</td>
          <td>{currentadvertisement.description}</td>
          <td>
            <IconButton aria-label="edit" size="small"
            onClick={() => {this.updateAdvertisement(currentadvertisement._id);}}>
              <EditIcon/>
            </IconButton>
            <IconButton aria-label="delete" size="small"
            onClick={() => {this.deleteAdvertisement(currentadvertisement._id);}}>
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
                Logged Advertisement
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
                  generate Advertisement report
                </Button> 
              </label>
              </div>
              <div className="table-responsive">
                <table className="table table-borderless table-sm">
                  <thead className="thead-light">
                    <tr>
                      <th>Title</th>
                      <th>Publisheddate</th>
                      <th>Description</th>
                      <th>Actions</th>         
                    </tr>
                  </thead>
                  <div className="mt-2"></div>
                  <tbody>{this.advertisementList()}</tbody>
                </table>
              </div>
            </div>
        </div>
        <UpdateAdvertisement 
          show={this.state.show} 
          onHide={() => this.setState({show: false})} 
          advertisementId={this.state.advertisementId}
        />
      </div>
    )
  }
}