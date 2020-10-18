import React, { Component } from "react";
import axios from "axios";


export default class EditRequestbook extends Component {
  constructor(props) {
    super(props);

    this.onChangeBookName = this.onChangeBookName.bind(this);
    this.onChangeAuthorName = this.onChangeAuthorName.bind(this);
    this.onChangePrintedYear = this.onChangePrintedYear.bind(this);
    this.onChangeUserId = this.onChangeUserId.bind(this);
    this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      bookname: "test",
      authorname: "",
      printedyear: "",
      userid: "",
      useremail: "",
    };
  }

  componentDidMount() {
    axios
      .post("http://localhost:8057/request/update" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          bookname: response.data.bookname,
          authorname: response.data.authorname,
          printedyear: response.data.printedyear,
          userid: response.data.userid,
          useremail: response.data.useremail,         
        });
      })
      .catch(function (error) {
        console.log(error);
      });

  }

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
      bookname: this.state.bookname,
      authorname: this.state.authorname,
      printedyear: this.state.printedyear,
      userid: this.state.userid,
      useremail: this.state.useremail
    }

    console.log(requestbook);

    axios
      .post(
        "http://localhost:5000/requestbook/update/" + this.props.match.params.id,
        requestbook
      )
      .then((res) => console.log(res.data));

    window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Edit Request book</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Book name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.bookname}
              onChange={this.onChangeBookName}
            >
              
            </input>
          </div>
          <div className="form-group">
            <label>Author name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.authorname}
              onChange={this.onChangeAuthorName}
            />
          </div>
          <div className="form-group">
            <label>Printed year: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.printedyear}
              onChange={this.onChangePrintedYear}
            />
          </div>
          
          <div className="form-group">
            <label>User ID: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.userid}
              onChange={this.onChangeUserId}
            />
          </div>
          
          <div className="form-group">
            <label>User email: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.useremail}
              onChange={this.onChangeUserEmail}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Edit Request book"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
