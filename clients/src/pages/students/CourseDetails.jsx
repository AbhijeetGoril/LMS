import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../contexts/Context";
import Loading from "../../components/students/Loading";
import { assets } from "../../assets/assets";

import TutioralSection from "../../components/students/TutioralSection";
import Footer from "../../components/students/Footer";
import YouTube from "react-youtube";
import { toast } from "react-toastify"
import API from "../../api/axios";

const CourseDetails = () => {
  const { id } = useParams();
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);
  
  const {
    calculateRating,
    allCourses,
    calcutateCourseTime,
    calcutateNoOfLecture,
    currency,
    userData
  } = useContext(AppContext);
  
  const [courseData, setCourseData] = useState(null);

  const fetchCourseData = async () => {
   
    try {
      const {data}=await API.get(`course/${id}`)
      console.log(data.success)
      if(data.success){
        setCourseData(data.courseData);
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error.message)
    }
    
    
  };

  const purchaseCourse=()=>{
    try {
      
    } catch (error) {
      
    }
  }

  useEffect(() => {
     if (userData?.enrolledCourses.includes(id)) {
     setIsAlreadyEnrolled(true)
   } 
    fetchCourseData();
  }, [userData]);

  return courseData ? (
    <>
      <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left  ">
        <div className="  w-full h-[500px] absolute left-0 top-0 bg-gradient-to-b from-cyan-100/70 z-0 "></div>
        {/* left column */}
        <div className="max-w-xl relative text-gray-500 ">
          <h1 className="md:text-4xl md:leading-11 text-2xl  leading-9 font-semibold text-gray-800 ">
            {courseData.courseTitle}
          </h1>
          <p
            className="pt-4 md:text-base text-sm"
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription.slice(0, 200),
            }}
          />
          {/* review and ratings */}
          <div className="flex items-center space-x-2 pt-3 pb-1 text-sm ">
            <p>{calculateRating(courseData)} </p>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={
                    i < Math.floor(calculateRating(courseData))
                      ? assets.star
                      : assets.star_blank
                  }
                  alt="star"
                  className="w-4 h-4"
                />
              ))}
            </div>

            <p className="text-blue-600 ">
              ({courseData.courseRatings.length}{" "}
              {courseData.courseRatings.length > 1 ? "ratings" : "rating"}){" "}
            </p>
            <p className="">
              {courseData.enrolledStudents?.length}{" "}
              {courseData.courseRatings.length > 1 ? "students" : "student"}{" "}
            </p>
          </div>
          <p className="text-sm">
            Course by{" "}
            <sapn className="underline text-blue-600  ">Abhijeet </sapn>
          </p>
          <p>Duration {calcutateNoOfLecture(courseData)}</p>
          <div className="pt-8 text-gray-800 ">
            <h2 className="text-xl font-semibold ">Course Structure</h2>
            <div className="pt-5">
              {courseData.chapters?.map((chapter, index) => (
                <TutioralSection
                  chapter={chapter}
                  key={index}
                  setPlayerData={setPlayerData}
                />
              ))}
            </div>
          </div>
          <div className="py-20 text-sm text-gray-700">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Course Description
            </h3>
            <p
              className="rich-text"
              dangerouslySetInnerHTML={{
                __html: courseData.courseDescription,
              }}
            />
          </div>
        </div>

        {/* right column */}
        <div className="relative max-w-[424px] rounded-t md:rounded-none overflow-hidden bg-white min-w-[300px] sm:min-w-[420px] shadow-[0px_4px_15px_2px_rgba(0,0,0,0.1)]  ">
          {playerData ? (
            <YouTube
              videoId={playerData.videoId}
              opts={{ playerVars: { autoplay: 1 } }}
              iframeClassName="w-full aspect-video "
            />
          ) : (
            <img src={courseData.courseThumbnail} />
          )}
          <div className="p-5">
            <div className="flex items-center gap-2 ">
              <img
                src={assets.time_left_clock_icon}
                alt="time left clock icon"
                className="w-3.5"
              />
              <p className="text-red-500">
                <span className="font-medium ">5 days </span>left at the price!
              </p>
            </div>
            <div className="flex gap-3 items-center pt-2 ">
              <p className="text-gray-800 md:text-4xl text-2xl font-semibold ">
                {currency}{" "}
                {(
                  courseData.coursePrice -
                  (courseData.discount * courseData.coursePrice) / 100
                ).toFixed(2)}{" "}
              </p>
              <p className="md:text-lg text-gray-500 line-through ">
                {" "}
                {currency} {courseData.coursePrice}
              </p>
              <p className="md:text-lg text-gray-500">
                {" "}
                {courseData.discount} % off
              </p>
            </div>

            <div className="flex items-center text-sm md:text-[15px] md:leading-[21px] gap-4 pt-2 md:pt-4 text-gray-500 ">
              <div className="flex items-center gap-1">
                <img src={assets.star} alt="star icon" />
                <p>{calculateRating(courseData)} </p>
              </div>
              <div className="h-4 w-px bg-gray-500/40"></div>
              <div className="flex items-center gap-1 ">
                <img src={assets.time_clock_icon} alt="clock icon" />
                <p>{calcutateCourseTime(courseData)} </p>
              </div>
              <div className="h-4 w-px bg-gray-500/40"></div>
              <div className="flex items-center gap-1 ">
                <img src={assets.lesson_icon} alt="clock icon" />
                <p>{calcutateNoOfLecture(courseData)} </p>
              </div>
            </div>
            <button className="md:mt-6 mt-4 w-full rounded py-3  bg-blue-600 text-white font-medium ">
              {isAlreadyEnrolled ? "Already-Enrolled" : "Enroll Now"}{" "}
            </button>
            <div className="pt-6">
              <p className="md:text-xl text-lg font-medium text-gray-800 ">
                What's in the course?
              </p>
              <ul className="ml-4 pt-2 text-sm md:text-[15px] md:leading-[21px] list-disc text-gray-500 ">
                <li>Lifetime access with free updates</li>
                <li>Step-by-step,hands-on project guidance</li>
                <li>Downloadables resourses and source code</li>
                <li>Quizzes to texts your knowleade</li>
                <li>Certificate of completion </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default CourseDetails;
