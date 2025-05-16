import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SearchBar from "../../components/students/SearchBar";
import { AppContext } from "../../contexts/Context";
import CourseCard from "../../components/students/CourseCard";
import { assets } from "../../assets/assets";
import Footer from "../../components/students/Footer";

const CourseList = () => {
  const navigate = useNavigate("");
  const { input } = useParams();
  const { allCourses } = useContext(AppContext);
  const [filteredCourses, setFilteredCourses] = useState([]);
  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempCourse = allCourses.slice();
      input
        ? setFilteredCourses(
            allCourses.filter((item) =>
              item.courseTitle.toLowerCase().includes(input.toLowerCase())
            )
          )
        : setFilteredCourses(tempCourse);
    }
  }, [allCourses, input]);
  return (
    <>
      <div className="relative px-4 sm:px-10 md:px-14 pt-10 text-left lg:px-36">
        <div className="flex flex-col md:flex-row items-start  justify-between w-full">
          <div className="flex md:flex-col flex-row w-full items-center justify-between md:items-start">
            <h1 className="text-4xl font-semibold text-gray-800">
              Course List
            </h1>
            <p className="text-gray-500">
              <span
                className="text-blue-600 cursor pointer"
                onClick={() => {
                  navigate("/");
                }}
              >
                Home
              </span>
              /<span>Course List</span>
            </p>
          </div>
          <SearchBar data={input} />
        </div>
        {input && (
          <div className="inline-flex items-center gap-4 px-4 py-2 border mt-8 -mb-8 text-gray-600 ">
            <p>{input}</p>
            <img
              src={assets.cross_icon}
              alt=""
              className="cursor-pointer "
              onClick={() => {
                navigate("/course-list");
              }}
            />
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-0 my-10 md:my-16">
          {filteredCourses.map((course, index) => (
            <CourseCard course={course} key={index} />
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default CourseList;
