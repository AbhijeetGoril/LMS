import React, { useContext, useState } from "react";
import { AppContext } from "../../contexts/Context";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { Line} from 'rc-progress';
import Footer from "../../components/students/Footer";
const MyEnrollmanrs = () => {
  const { enrolledCourse, calcutateCourseTime } = useContext(AppContext);
  
  const [progressArray, setProgressArray] = useState([
    { lectureCompleleted: 1, totalCompleleted: 2 },
    { lectureCompleleted: 3, totalCompleleted: 5 },
    { lectureCompleleted: 4, totalCompleleted: 4 },
    { lectureCompleleted: 2, totalCompleleted: 2 },
    { lectureCompleleted: 5, totalCompleleted: 10 },
    { lectureCompleleted: 6, totalCompleleted: 6 },
    { lectureCompleleted: 2, totalCompleleted: 7 },
    { lectureCompleleted: 9, totalCompleleted: 9 },
    { lectureCompleleted: 1, totalCompleleted: 3 },
    { lectureCompleleted: 0, totalCompleleted: 5 },
    { lectureCompleleted: 8, totalCompleleted: 10 },
    { lectureCompleleted: 3, totalCompleleted: 6 },
    { lectureCompleleted: 7, totalCompleleted: 7 },
    { lectureCompleleted: 2, totalCompleleted: 8 },
    { lectureCompleleted: 1, totalCompleleted: 4 },
  ]);

  const navigate=useNavigate()
  console.log(enrolledCourse);
  return (
    <>
      <div className="md:px-36 px-6 pt-10 ">
        <h1 className="text-2xl font-semibold ">MyEnrollmanrs</h1>
        <table className="md:table-auto table-fixed  w-full overflow-hidden border mt-10">
          <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden ">
            <tr>
              <th className="px-4  py-3 font-semibold truncate ">Course </th>
              <th className="px-4  py-3 font-semibold truncate ">Duration </th>
              <th className="px-4  py-3 font-semibold truncate ">Completed </th>
              <th className="px-4  py-3 font-semibold truncate ">Status </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {enrolledCourse.map((course, index) => (
              <tr key={index} className="border-b border-gray-500/20">
                <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 ">
                  <img
                    className="w-14 sm:w-24 md:w-28"
                    src={course.courseThumbnail}
                    alt={course.courseThumbnail}
                  />
                  <div className=" ">
                    <p className="mb-1 max-sm:text-sm w-full ">{course.courseTitle}</p>
                    <Line percent={progressArray[index] ? progressArray[index].lectureCompleleted/progressArray[index].totalCompleleted*100 :"0"} strokeWidth={3} className="rounded-full bg-gray-300 w-full" />

                  </div>
                </td>
                <td className="px-4 py-3 max-sm:hidden ">
                  {calcutateCourseTime(course)}{" "}
                </td>
                <td className="px-4 py-3 max-sm:hidden">
                  {progressArray[index] && (
                    <>
                      {progressArray[index].lectureCompleleted}/
                      {progressArray[index].totalCompleleted}
                      &nbsp;Lectures
                    </>
                  )}
                </td>

                <td className="px-4 py-3 max-sm:text-right">
                  <button className="px-3 sm:px-5 py-1.5 sm:py-2 bg-blue-600 max-sm:text-xs text-white " onClick={()=>navigate("/player/" + course._id )}>
                    {progressArray[index] &&progressArray[index].lectureCompleleted/progressArray[index].totalCompleleted==1?"Completed":"On Going" }
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer/>
    </>
  );
};

export default MyEnrollmanrs;
