import React from 'react';
import Avatar from "@material-ui/core/Avatar";
import Paper from '@material-ui/core/Paper';
import StarRating from "stars-rating";
import ShowMoreText from "react-show-more-text";

const AdminFeedback = ({name, rating, comment, picture, date}) => {

  return (
    <div style={{paddingBottom: 5}}>
    <Paper style={{ padding: 10, borderRadius: 8 }} variant="outlined"> 
      <div className="row" style={{ paddingLeft: 17 }}>
      <Avatar
        alt="Remy Sharp"
        src={picture}
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
            {name}
          </div>
          <div style={{ pointerEvents: "none", paddingLeft: 12 }}>
            <div className="row" style={{ paddingLeft: 0 }}>
              <label>
                  <div style={{ pointerEvents: "none", paddingLeft: 12 }}>
                    <StarRating
                      count={5}
                      size={17}
                      value={rating}
                      color2={"#eb8a2f"}
                    />
                  </div>
              </label>
              <label style={{ fontSize: 12, paddingTop: 5, paddingLeft: 5 }}>
                  on {date}
              </label>
            </div>
          </div>
        </label>
      </div>
      <div style={{ fontSize: 13, paddingLeft: 68, paddingTop: 0 }}>
          <ShowMoreText
            lines={4}
            more="Show more"
            less="Show less"
            expanded={false}
            keepNewLines={false}
          >
            {comment}
          </ShowMoreText>
        </div>
    </Paper>
    </div>
  )
}

export default AdminFeedback