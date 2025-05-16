import React, { useState } from "react";


const Rating = ({ intialRationg }) => {
 const [rating,setRating]=useState(intialRationg||0)
 const [hoverRating,setHoverRating]=useState(0)
  return (
    <div>
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;
        return (
          <span
            className={`text-xl sm:text-2xl cursor-pointer transition-colors ${
              starValue<=(hoverRating||rating) ? "text-yellow-500" : "text-gray-400"
            }`}
           onClick={()=>setRating(starValue)} 
            onMouseEnter={()=>setHoverRating(starValue)}
            onMouseLeave={()=>setHoverRating(0)}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

export default Rating;
