import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import StarRating from "stars-rating";
import ShowMoreText from "react-show-more-text";
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Edit'
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import jwt from 'jsonwebtoken'
import axios from 'axios'

// @ material ui styles
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
      padding: 5
    },
    color: "#dd2c00"
  },
}));

const useUpdate = makeStyles((theme) => ({
  root: {
    // color: "#f4511e"
  },
}));

const useDelete = makeStyles((theme) => ({
  root: {
    // color: "#dd2c00"
  },
}));

const useForceUpdate = () => useState()[1]

// @ component function
const Feedback = ({ id, productId, customerId, customerName, profilePicture, rating, comment }) => {

  const classes = useStyles();
  const deleteButton = useDelete();
  const update = useUpdate();
  const token = localStorage.getItem('Authorization')
  const forceUpdate = useForceUpdate()
  let verify = null
  if (token) {
    verify = jwt.verify(token, 'jwtSecret')
    console.log('key id', verify._id)
    console.log('customer id', customerId)
    console.log('customer name', customerName)
    console.log(customerId === verify._id)
  } else {
    verify = null
  }


  const deleteComment = async () => {
    const config = {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
        "content-type": "application/json",
      },
    };

    await axios.delete(`http://localhost:8059/feedback/delete/${productId}/${id}`, config)
      .then((res) => {
        console.log('comment deleted')
        forceUpdate()
      }).catch((error) => {
        console.log(error.message)
      })
  }

  return (
    <div className="pb-2 pr-2">
      <Paper style={{ padding: 10, borderRadius: 8 }} variant="outlined">
        <div className="row" style={{ paddingLeft: 17 }}>
          <Avatar
            alt="Remy Sharp"
            src={profilePicture}
            style={{ width: 50, height: 50 }}
          />
          <label>
            <div
              style={{
                pointerEvents: "none",
                paddingLeft: 12,
                fontWeight: "bold",
              }}
            >
              {customerName}
            </div>
            <div style={{ pointerEvents: "none", paddingLeft: 12 }}>
              <StarRating count={5} size={23} value={rating} color2={"#eb8a2f"} />
            </div>
          </label>
        </div>
        <div style={{ fontSize: 15, paddingLeft: 68, paddingTop: 0 }}>
          <ShowMoreText
            lines={4}
            more="Show more"
            less="Show less"
            expanded={false}
            keepNewLines={false}
          >
            {comment}
          </ShowMoreText>
          {verify === null || customerId !== verify._id ?
            <div></div>
            :
            <div className="d-flex justify-content-end">
              <div style={{ paddingTop: 8 }}>
                <IconButton aria-label="delete" color="inherit" onClick={deleteComment}>
                  <DeleteIcon className={deleteButton.root} fontSize="small" />
                </IconButton>
                <IconButton aria-label="update" color="inherit">
                  <UpdateIcon className={update.root} fontSize="small" />
                </IconButton>
              </div>
            </div>}
        </div>
      </Paper>
    </div>
  );
};

export default Feedback;
