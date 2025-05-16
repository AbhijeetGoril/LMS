import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../contexts/Context";
import CourseCard from "./CourseCard";

const CoursesSection = () => {
  const { allCourses } = useContext(AppContext);
  
  return (
    <div className="py-16 md:px-40 px-8">
      <h2 className="text-3xl font-medium text-gray-800">
        Learn from the best{" "}
      </h2>
      <p className="text-sm md:text-base text-gray-500 mt-3">
        Discover out top-rated courses accoss various categories. From coding
        and design to <br/> business and wellness, our courses are crafted to deliver
        results.
      </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-0 my-10 md:my-16">
  {allCourses.slice(0, 4).map((course, index) => (
    <CourseCard course={course} key={index} />
  ))}
</div>
      <Link
        to="/course-list"
        onClick={() => scrollTo(0, 0)}
        className="inline-block mt-6 text-gray-500 border border-gray-500/30 px-10 py-3 rounded font-bold hover:bg-gray-100 hover:text-black hover:border-gray-700 transition duration-300"
      >
        Show all course
      </Link>
    </div>
  );
};

export default CoursesSection;
