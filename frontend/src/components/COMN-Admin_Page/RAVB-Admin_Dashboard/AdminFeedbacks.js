import React from 'react';
import axios from 'axios';
import AdminFeedback from './Feedback'

export default class AdminFeedbacks extends React.Component {
  constructor(props) {
    super()
    this.state = {
      feedbacks: []
    }
  }

  async componentDidMount() {
    await axios.get('http://localhost:8059/admin/getcomments').then((res) => {
      this.setState({ feedbacks: res.data.feedbacks })
    }).catch((err) => {
      console.log(err.message)
    })
  }

  render() {
    return (
      <div>
        {this.state.feedbacks.map((feedback) => (
          <div>
            <AdminFeedback 
              name={feedback.userName}
              rating={feedback.rating}
              comment={feedback.comment}
              picture={feedback.userPicture}
              date={feedback.date}
            />
          </div>
        ))}
      </div>
    )
  }
}