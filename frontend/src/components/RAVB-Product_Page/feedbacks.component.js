import React, { useEffect, useState } from "react";
import axios from "axios";
import Feedback from "./feedback.component";
import CreateFeedback from "./create-feedback.component";
import Ratings from "./ratings.component";
import FadeIn from 'react-fade-in'
import CircularProgress from '@material-ui/core/CircularProgress';

const Feedbacks = (productId) => {
  const [loading, setLoading] = useState(true);
  const [feedbacks, setFeedbacks] = useState([]);
  const [ratings, setRatings] = useState({});
  const [error, setError] = useState(null);

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
        <FadeIn>
          {feedbacks.map((feedback, index) => (
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
