import React from 'react'
import { AppContext } from './contexts/Context'
import { Route, Routes, useMatch} from 'react-router-dom'
import Home from "./pages/students/Home"
import CourseList from "./pages/students/CourseList"
import CourseDetails from "./pages/students/CourseDetails"
import MyEnrollmanrs from "./pages/students/MyEnrollmanrs"
import Player from "./pages/students/Player"
import Educater from "./pages/educater/Educater"
import DashBorad from "./pages/educater/DashBorad"
import AddCourse from "./pages/educater/AddCourse"
import MyCourses from "./pages/educater/MyCourses"
import StudentsEroll from "./pages/educater/StudentsEroll"
import Navbar from "./components/students/Navbar"
import 'quill/dist/quill.snow.css';

const App = () => {
  const isEduaterRoute= useMatch("/educater/*")
  
  return (
    <div className=' text-default min-h-screen bg-white '>
      {!isEduaterRoute&&<Navbar></Navbar>}
      <Routes>
        <Route path='/' element={<Home/> }/>
        <Route path='/course-list' element={<CourseList/>}/>
        <Route path='/course-list/:input' element={<CourseList/>}/>
        <Route path='/course/:id' element={<CourseDetails/>}/>
        <Route path='my-enrollmants' element={<MyEnrollmanrs/>}/>
        <Route path='/player/:courseId' element={<Player/>}/>
        <Route path='/educater' element={<Educater/>}>
          <Route path='/educater' element={<DashBorad/>}/>
          <Route path='add-course' element={<AddCourse/>}/>
          <Route path='my-courses' element={<MyCourses/>}/>
          <Route path='student-enrolled' element={<StudentsEroll/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App