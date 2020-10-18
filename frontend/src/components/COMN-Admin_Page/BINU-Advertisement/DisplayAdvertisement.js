import React, { Component } from 'react';
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

export default class DisplayAdvertisement extends Component {

  render() {
    
    return (
      <div className="pt-3">
        <div className="card shadow mb-4 w-100">
          <div className="card-header py-3">
              <h4 className="m-0 font-weight-bold text-primary">
                Logged Advertistments
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
                  generate Advertistments report
                </Button> 
              </label>
              </div>
              <div className="table-responsive">
                <table className="table table-borderless table-sm">
                  <thead className="thead-light">
                    <tr>
                      <th>Advertistment Image</th>
                      <th>Advertistment Title</th>
                      <th>Published Date</th>
                      <th>description</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <div className="mt-2"></div>
                  <tbody>  </tbody>
                </table>
              </div>
            </div>
        </div>
      
      </div>
    );
  }
}