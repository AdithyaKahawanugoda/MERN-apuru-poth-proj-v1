import React, { Component } from 'react';
import axios from 'axios';
import SingleBookRequest from './SingleReqestBook'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import Button from '@material-ui/core/Button'

export default class DisplayRequestBook extends Component {
  constructor(props) {
    super();
    this.generateReport = this.generateReport.bind(this)
    this.state = {
      requests: []
    }
  }

  async componentDidMount() {
    const config = {
      headers: {
        Authorization: localStorage.getItem("Authorization")
     },
    }
    await axios.get('http://localhost:8059/request/myrequests', config)
    .then((res) => {
      this.setState({ requests: res.data.requests })
    })
    .catch((err) => {
      alert(err.message)
    })
  }

  async generateReport() {
    const obj = {requestItems: this.state.requests}
    await axios.post('http://localhost:8059/requestbookreport/generaterequestbook', obj)
    .then(() => {
      alert('Thank You For Download')
    })
    .catch((err) => {
      console.log(err.message)
    })
  }

  render() {
    return (
      <div>
        <h2 className="text-color">My Requests</h2>
        {console.log(this.state.requests)}
        <Button className="w-25" variant="contained" startIcon={<InsertDriveFileIcon/>} disableElevation onClick={this.generateReport}>
          download my requests
        </Button>
        <div className="pt-2">
          <div className="row">
            {this.state.requests.map((item) => (
              <div key={item._id} className="col-lg-4 col-sm-12">
              <SingleBookRequest
                authorName={item.authorName}
                bookName={item.bookName}
                printedYear={item.printedYear}
                itemId={item._id}
              />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}