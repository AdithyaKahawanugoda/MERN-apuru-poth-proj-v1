import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';

const Requestbook = (props) => (
  <>
  
  <tr style={{color:"black"}}>

    <td>{props.item.bookName}</td>
    <td>{props.item.authorName}</td>
    <td>{props.item.printedYear}</td>
    <td>{props.item.userID}</td>
    <td>{props.item.userEmail}</td>
    
    <td>
      <Link to={"/edit/" + props.item._id}>edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteRequestbook(props.item._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
  </>
);

export default class RequestbookList extends Component {

 
  constructor(props) {
    super(props);

    this.deleteRequestbook = this.deleteRequestbook.bind(this)

    this.state = {requestbook: []};
  }

  componentDidMount() {
    axios
      .get("http://localhost:8057/request/all")
      .then(response => {
        this.setState({ requestbook: response.data })
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteRequestbook(id) {
    axios.delete("http://localhost:8057/request/all" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      requestbook: this.state.requestbook.filter((el) => el._id !== id),
    });
  }

  RequestbookList() {
    return this.state.requestbook.map((currentrequestbook) => {
      return (
        <Requestbook
          item={currentrequestbook}
          deleteRequestbook={this.deleteRequestbook}
          key={currentrequestbook._id}
        />
      );
    });
  }
  render() {
    return (
      <div>
      <h3>List</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Book name</th>
            <th>Author name</th>
            <th>Printed year</th>
            <th>User ID</th>
            <th>User email</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody style={{ color:"black"}}>{this.RequestbookList()}</tbody>
      </table>
    </div>


    )
  }
}