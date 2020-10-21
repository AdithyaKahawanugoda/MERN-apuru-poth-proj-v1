import React, { useEffect, useState } from "react";
import axios from "axios";
import Feedback from "./feedback.component";
import CreateFeedback from "./create-feedback.component";
import Ratings from "./ratings.component";
import FadeIn from 'react-fade-in'
import CircularProgress from '@material-ui/core/CircularProgress';
import UpdateFeedback from './UpdateFeedback'

const Feedbacks = (productId) => {
  const [loading, setLoading] = useState(true);
  const [feedbacks, setFeedbacks] = useState([]);
  const [ratings, setRatings] = useState({});
  const [error, setError] = useState(null);
  const [filterComments, setFilterComments] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    setLoading(true);
    const fetchFeedbacks = async () => {
      await axios
        .get(`http://localhost:8059/feedback/read/${productId.productId}`)
        .then((res) => {
          setFeedbacks(res.data.feedbacks);
          setRatings(res.data.ratings);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          console.log(error.message);
        });
    };
    fetchFeedbacks();
  }, []);

  useEffect(() => {
    setFilterComments(
      feedbacks.filter((feedback) => feedback.comment.toLowerCase().includes(search.toLowerCase()))
    )
  }, [search, feedbacks])

  if (loading) {
    return <div className="d-flex justify-content-center" style={{ paddingTop: 400 }}>
      <CircularProgress hidden={true} />
    </div>
  }

  return (
    <div className="container">
      <div className="col-lg-10 col-sm-12 col-md-8 col-xs-12 product-col">
        <CreateFeedback productId={productId} />
        <Ratings ratings={ratings} productId={productId} />
        <h3 className="pb-3 text-color">Customer Feedbacks</h3>
        <label className="text-color">Search Customer Comments</label>
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Search Customer Comments" aria-label="Recipient's username"  aria-describedby="basic-addon2" onChange={(e) => setSearch(e.target.value)}/>
          <div class="input-group-append">
            <span class="input-group-text" id="basic-addon2">Search</span>
          </div>
        </div>
        <br/>
        <FadeIn>
          {filterComments.map((feedback, index) => (
            <div key={feedback._id}>
              <Feedback
                id={feedback._id}
                productId={productId.productId}
                customerId={feedback.userId}
                customerName={feedback.userName}
                profilePicture={feedback.userPicture}
                rating={feedback.rating}
                comment={feedback.comment}
              />
            </div>
          ))}
        </FadeIn>
      </div>
    </div>
  );
};

export default Feedbacks;
