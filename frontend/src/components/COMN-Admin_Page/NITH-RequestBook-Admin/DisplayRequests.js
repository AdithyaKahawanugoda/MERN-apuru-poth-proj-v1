import React, { Component } from 'react';
import axios from 'axios';
import SingleRequest from './SingleRequest'

export default class DisplayBookRequest extends Component {
  constructor(props) {
    super();

    this.state = {
      bookRequests: []
    }
  }

  async componentDidMount() {
    await axios.get('http://localhost:8059/request/all')
    .then((res) => {
      this.setState({ bookRequests: res.data.requests})
    })
    .catch((err) => {
      alert(err.message)
    })
  }

  render() {
    return (
      <div>
        {console.log(this.state.bookRequests)}
        {this.state.bookRequests.map((item) => (
          <SingleRequest
            bookName={item.bookName}
            userName={item.userName}
            userEmail={item.userEmail}
            authorName={item.authorName}
            userImage={item.profileImage}
            printedYear={item.printedYear}
          />
        ))}
      </div>
    )
  }
}