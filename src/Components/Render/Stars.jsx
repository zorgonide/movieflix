import React, { useState } from "react";
import "font-awesome/css/font-awesome.min.css";
import { postBackend } from "../../Utilities/apiCalls";

const StarRating = ({ userRating, onChange, User_ID, Movie_ID }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleRatingClick = (rating) => {
    postBackend({
      url: "api/rating/" + Movie_ID,
      data: {
        userRating: rating,
      },
    }).then(() => {
      if (onChange) {
        onChange(rating);
      }
    });
  };

  const handleRatingHover = (rating) => {
    setHoverRating(rating);
  };

  const stars = [];
  const maxRating = 5;

  for (let i = 1; i <= maxRating; i++) {
    const filled = i <= (userRating || hoverRating);

    stars.push(
      <span
        key={i}
        className={`fa fa-star${filled ? "" : "-o"}`}
        style={{
          marginRight: "5px",
          cursor: "pointer",
          color: "#fff",
          fontSize: "24px",
        }}
        onMouseEnter={() => handleRatingHover(i)}
        onMouseLeave={() => handleRatingHover(0)}
        onClick={() => handleRatingClick(i)}
      />
    );
  }

  return <div>{stars}</div>;
};

export default StarRating;
