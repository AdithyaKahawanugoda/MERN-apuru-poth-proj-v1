import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import SendIcon from '@material-ui/icons/Send';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar'

export default class CreateRequestbook extends Component {

//implementing constructor


  constructor(props) {
    super(props);
    //implementing binding
    this.onChangeBookName = this.onChangeBookName.bind(this);
    this.onChangeAuthorName = this.onChangeAuthorName.bind(this);
    this.onChangePrintedYear = this.onChangePrintedYear.bind(this);
    this.onChangeUserId = this.onChangeUserId.bind(this);
    this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this)

    this.state = {
      bookname: "",
      authorname: "",
      printedyear: "",
      userid: "",
      useremail: "",
      open: false

    }
  }

  handleClose(reason) {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({open: false})
  };

  onChangeBookName(e) {
    this.setState({
      bookname: e.target.value
    })
  }

  onChangeAuthorName(e) {
    this.setState({
      authorname: e.target.value
    })
  }

  onChangePrintedYear(e) {
    this.setState({
      printedyear: e.target.value
    })
  }

  onChangeUserId(e) {
    this.setState({
      userid: e.target.value
    })
  }

  onChangeUserEmail(e) {
    this.setState({
      useremail: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const requestbook = {
      bookName: this.state.bookname,
      authorName: this.state.authorname,
      printedYear: this.state.printedyear,
      userEmail: this.state.useremail
    }

    const config = {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    };

    axios
    .post('http://localhost:8059/request/add', requestbook, config)
    .then((res) => {
      console.log(res.data)
      alert('Request Added Successfully')
    }).catch((err) => {
      console.log(err)
      //alert("Please Login to the Applicaion")
      //window.location = '/login'
      this.setState({open: true})
    })
  }

  render() {
    return (
      <div className="container pt-5">
      <Snackbar open={this.state.open} autoHideDuration={3000} onClose={this.handleClose} anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}>
        <div className="alert alert-danger">
            Plase login to the Application
        </div>
      </Snackbar>
        <div className="card o-hidden border-0 shadow-lg my-5">
          <div className="card-body p-0">
            <div className="row">
              <div className="col-lg-5 d-none d-lg-block bg-request-book"></div>
                <div className="col-lg-7">
                  <div className="pl-5 pr-5 pb-5 pt-4">
                    <div className="text-center text-color pt-0">
                      <h1 className="text-gray-900 mb-4">Request Book</h1>
                    </div>
                    <form onSubmit={this.onSubmit} className="text-color">
                      <div className="form-group"> 
                        <label>Book Name</label>
                        <input type="userInput" required className="form-control" value={this.state.bookname}
                        onChange={this.onChangeBookName}/>
                        <small className="text-muted">enter name of the book that you want to request</small>
                      </div>
                      <div className="form-group"> 
                        <label>Author Name</label>
                        <input  type="text" required className="form-control" value={this.state.authorname}
                        onChange={this.onChangeAuthorName} />
                        <small className="text-muted">book author's name</small>
                      </div>
                      <div className="form-group">
                        <label>Printed Year</label>
                        <input type="number" className="form-control" value={this.state.printedyear}
                        onChange={this.onChangePrintedYear}/>
                        <small className="text-muted">printed year of the book</small>
                      </div>
                      <div className="form-group">
                        <label>User Email</label>
                        <input type="text" className="form-control" value={this.state.useremail}
                        onChange={this.onChangeUserEmail}/>
                        <small className="text-muted">we will send you an email to this main</small>
                      </div>
                      <Button variant="contained" className="w-10" style={{background: "#ff8c00", width: 100+"%"}}
                      startIcon={<SendIcon />} disableElevation type="submit">request this book</Button>
                    </form>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}