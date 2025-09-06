import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/educater/Navbar'
import SideBar from '../../components/educater/SideBar'
import Footer from '../../components/educater/Footer'

const Educater = () => {
  return (
    <>
    <div className='text-[15px] leading-[21px] min-h-screen bg-white '>
        <Navbar/>
        <div className='flex'>
          <SideBar/>
          <div className='flex-1'>
            {<Outlet/>}
          </div>
        </div>
        
    </div>
    <Footer/>
    </>
  )
}

export default Educater