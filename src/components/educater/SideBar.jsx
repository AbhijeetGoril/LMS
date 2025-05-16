import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../contexts/Context'
import Navbar from './Navbar'
import { NavLink } from 'react-router-dom'

const SideBar = () => {
    const {isEducater}=useContext(AppContext)
    const manuItems=[
        {name:"Daskbored",path:"/educater",icon:assets.home_icon},
        {name:"Add Course",path:"/educater/add-course",icon:assets.add_icon},
        {name:"My Courses",path:"/educater/my-courses",icon:assets.my_course_icon},
        {name:"Student Enrolled",path:"/educater/student-enrolled",icon:assets.person_tick_icon}
    ]
  return (
    isEducater &&<div className='md:w-64 w-16 border-r min-h-screen text-base  border-gray-500 py-2 flex flex-col'>
      {manuItems.map((item)=>{
        return <NavLink
        to={item.path}
        key={item.name}
      end={item.path==="/educater"}
        className={({isActive})=> `flex items-center md:flex-row flex-col md:justify-start justify-center py-3.5 md:px-10 gap-3 ${isActive ?'bg-indigo-50 border-r-[6px] border-indigo-500/90' :"hover:bg-gray-100/90 border-r-[6px] border-white hover:border-gray-200/90 "} ` }
        >
            <img src={item.icon} alt="" className='w-6 h-6'/>
            <p className='md:block hidden text-center'>{item.name}</p>
        </NavLink>
      })}
    </div>
  )
}

export default SideBar
