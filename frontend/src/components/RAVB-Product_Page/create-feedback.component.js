import React, { useState, useCallback } from "react";
import Button from "@material-ui/core/Button";
import StarRating from "stars-rating";
import axios from 'axios'
import Snackbar from '@material-ui/core/Snackbar'

const CreateFeedback = (productId) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState(null);
  const [open, setOpen] = useState(false);

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const OnFormSubmit = async (e) => {
    e.preventDefault();
    console.log(productId.productId.productId)

    if (rating === 0) {
      console.log('this is in check function')
      setOpen(true)
      return;
    }

    const feedback = {
      rating: rating,
      comment: comment
    }

    const config = {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
        "content-type": "application/json",
      },
    };

    await axios.post(`http://localhost:8059/feedback/create/${productId.productId.productId}`, feedback, config)
      .then((res) => {
        console.log('data send to database');
        window.location.reload()
      }).catch((error) => {
        alert('Plase Register To the Application')
        console.log(error.message)
      })
  }

  return (
    <div className="pb-2">
      <h3 className="text-color">Add Your Feedback</h3>
      <StarRating
        count={5}
        size={50}
        onChange={ratingChanged}
        color2={"#eb8a2f"}
        value={rating}
      />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} >
        <div className="alert alert-danger">
          Please give your rating for product
        </div>
      </Snackbar>
      <form autoComplete="off" onSubmit={OnFormSubmit}>
        <textArea
          rows={6}
          className="form-control"
          placeholder="Enter your comment"
          variant="outlined"
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <div className="pt-3">
          <button style={{ width: 120, borderRadius: 5 }} type="submit" className="btn btn-light">
            Submit
          </button>
        </div>
      </form>

      <hr />
    </div>
  );
};

export default CreateFeedback;
