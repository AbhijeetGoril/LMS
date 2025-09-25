import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../contexts/Context";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  const { currency,calculateRating } = useContext(AppContext);
  const rating=calculateRating(course)
  const discountedPrice = (
    course.coursePrice -
    (course.discount * course.coursePrice) / 100
  ).toFixed(2);
  
  return (
    <Link
      to={`/course/${course._id}`}
      onClick={() => scrollTo(0, 0)}
      className="border border-gray-300 pb-6 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300 bg-white"
    >
      <img
        className="max-h-full max-w-full object-contain  "
        src={course.courseThumbnail}
        alt={course.courseTitle}
      />

      <div className="p-4 space-y-1 text-left">
        <h3 className="text-base font-semibold text-gray-800 line-clamp-2">{course.courseTitle}</h3>
        <p className="text-sm text-gray-500">{course.educator.name}</p>

        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <p className="font-medium">{rating}</p>
          <div className="flex items-center space-x-0.5">
            {[...Array(5)].map((_, i) => (
            
              <img
                key={i}
                src={i<Math.floor(rating)?assets.star:assets.star_blank}
                alt="star"
                className="w-4 h-4"
              />
            ))}
          </div>
          <p className="text-gray-500">{course.courseRatings.length}</p>
        </div>

        <p className="text-md font-bold text-gray-800">
          {currency}{discountedPrice}
        </p>
      </div>
    </Link>
  );
};

export default CourseCard;
