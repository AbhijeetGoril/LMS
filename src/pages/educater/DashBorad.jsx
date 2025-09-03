import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../contexts/Context";
import { assets, dummyDashboardData } from "../../assets/assets";
import Loading from "../../components/students/Loading";

const DashBorad = () => {
  const [dashboradData, setDashboradData] = useState(null);
  const { currency } = useContext(AppContext);

  const fatchdashboradData = async () => {
   
    setDashboradData(dummyDashboardData);
  };

  console.log(dashboradData);
  useEffect(() => {
    fatchdashboradData();
  }, [dummyDashboardData]);
  
  return dashboradData ? (
    <div className="min-h-screen flex flex-col items-start justify-between gap-8 md:pb-0 p-4 pt-8 pb-0 ">
      <div className="space-y-5">
        <div className="flex flex-wrap gap-5 items-center  ">
          <div className=" flex items-center gap-3 shadow-[0px_4px_15px_2px_rgba(0,0,0,0.1)] border border-blue-500 p-4 w-56 rounded-md">
            <img src={assets.patients_icon} alt="patients_icon"/>
            <div>
              <p className="text-2xl font-semibold text-gray-600 ">{dashboradData.enrolledStudentsData.length}</p>
              <p className="text-base text-gray-500 ">Total Enrollments </p>
            </div>
          </div>
          <div className=" flex items-center gap-3 shadow-[0px_4px_15px_2px_rgba(0,0,0,0.1)] border border-blue-500 p-4 w-56 rounded-md">
            <img src={assets.appointments_icon} alt="patients_icon"/>
            <div>
              <p className="text-2xl font-semibold text-gray-600 ">{dashboradData.totalCourses}</p>
              <p className="text-base text-gray-500 ">Total Courses </p>
            </div>
          </div>
          <div className=" flex items-center gap-3 shadow-[0px_4px_15px_2px_rgba(0,0,0,0.1)] border border-blue-500 p-4 w-56 rounded-md">
            <img src={assets.earning_icon} alt="patients_icon"/>
            <div>
              <p className="text-2xl font-semibold text-gray-600 ">{currency}{dashboradData.totalEarnings}</p>
              <p className="text-base text-gray-500 ">Total Earnings </p>
            </div>
          </div>

        </div>
        <div>
          <h2 className="pb-4 text-lg font-medium ">Latest Enrolments</h2>
          <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20 ">
          <table className="md:table-auto table-fixed  w-full overflow-hidden border ">
          <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left ">
            <tr>
              
              <th className="px-4  py-3 font-semibold text-center sm:table-cell "># </th>
              <th className="px-4  py-3 font-semibold  ">Student Name </th>
              <th className="px-4  py-3 font-semibold  ">Course Title </th>
            </tr>
          </thead>
          <tbody className="text-gray-500 text-sm">
            {dashboradData.enrolledStudentsData.map((item, index) => (
              <tr key={index} className="border-b border-gray-500/20">
                <td className="px-4 py-3 text-center hidden sm:table-cell">{index+1}</td>
                <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 ">
                  <img
                    className="w-9 h-9 rounded-full "
                    src={item.student.imageUrl}
                    alt="Profile"
                    
                  />
                  <span className="truncate">{item.student.name}</span>
                  
                </td>
                <td className="px-4 py-3 truncate ">
                  {item.courseTitle}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default DashBorad;
