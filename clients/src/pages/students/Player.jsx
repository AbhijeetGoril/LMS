import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../contexts/Context";
import { useParams } from "react-router-dom";
import TutioralSection from "../../components/students/TutioralSection";
import Loading from "../../components/students/Loading";
import YouTube from "react-youtube";
import Footer from "../../components/students/Footer";
import Rating from "../../components/students/Rating"
const Player = () => {
  const { enrolledCourse } = useContext(AppContext);
  const [enrolledCourseData, setEnrolledCourseData] = useState(null);
  const [playerData, setPlayerData] = useState(null);
  const { courseId } = useParams();
  console.log(playerData);
  const fatchErolledCourses = async () => {
    const data = enrolledCourse.find((course) => course._id == courseId);
    setEnrolledCourseData(data);
  };
  useEffect(() => {
    fatchErolledCourses();
  }, [enrolledCourse]);
  return enrolledCourseData ? (
    <>
      <div className="py-4 sm:py-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36">
        {/* left column */}
        <div className="text-gray-800">
          <h2 className="text-xl font-semibold ">Course Structre</h2>
          <div className="pt-5">
            {enrolledCourseData.courseContent.map((chapter, index) => (
              <TutioralSection
                chapter={chapter}
                key={index}
                index={index}
                setPlayerData={setPlayerData}
                isPlayerCompo={true}
              />
            ))}
          </div>
          <div className="flex items-center gap-2 py-3 mt-10 ">
            <h1 className="text-xl font-bold">Rate this Course:</h1>
            {/* <p>&#9733;</p> */}
            <Rating/>
          </div>
        </div>
        {/* right column */}
        <div>
          {playerData ? (
            <div>
              <YouTube videoId={playerData.lectureUrl.split("/").pop()  }  iframeClassName="w-full aspect-video " />
              <div className="flex justify-between items-center mt-1 ">
                <p>{playerData.chapter}.{playerData.lecture} {playerData.lectureTitle} </p>
                <button className="text-blue-600 " >{false?"Completed": "Mark Complete"}</button>
              </div>
            </div>
          ) : (
            <img src={enrolledCourseData.courseThumbnail} />
          )}
        </div>
      </div>
      <Footer/>
    </>
  ) : (
    <Loading />
  );
};

export default Player;
