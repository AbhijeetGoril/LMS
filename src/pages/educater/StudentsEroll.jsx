import React, { useEffect, useState } from 'react'
import { dummyStudentEnrolled } from '../../assets/assets';
import Loading from '../../components/students/Loading';

const StudentsEroll = () => {
  const [enrolledStudents, setEnrolledStudents] = useState(null);
    
  
    const fatchEnrolledStudents = async () => {
     
      setEnrolledStudents(dummyStudentEnrolled);
    };
    const formatCustomDate =(dateStr)=> {
      const date = new Date(dateStr);
      const day = date.getDate();
      const month = date.toLocaleString('en-US', { month: 'short' }); // "Dec"
      const year = date.getFullYear();
      return `${day}${month},${year}`;
    }
   
    useEffect(() => {
      fatchEnrolledStudents()
    }, []);
  return (
      enrolledStudents? <div className="min-h-screen flex flex-col items-start justify-between gap-8 md:pb-0 p-4 pt-8 pb-0 ">
            
            <div className='w-full'>
              <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20 ">
              <table className="md:table-auto table-fixed  w-full overflow-hidden border ">
              <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left ">
                <tr>
                  
                  <th className="px-4  py-3 font-semibold hidden text-center sm:table-cell "># </th>
                  <th className="px-4  py-3 font-semibold  ">Student Name </th>
                  <th className="px-4  py-3 font-semibold  ">Course Title </th>
                  <th className="px-4  py-3 font-semibold  ">Date </th>
                </tr>
              </thead>
              <tbody className="text-gray-500 text-sm">
                {enrolledStudents.map((item, index) => (
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
                    <td className="px-4 py-3 truncate ">
                      { formatCustomDate(item.purchaseDate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
              </div>
            </div>
          </div>:<Loading/>
  )
}

export default StudentsEroll
