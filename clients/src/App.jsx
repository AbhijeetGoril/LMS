// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

import Home from "./pages/students/Home";
import CourseList from "./pages/students/CourseList";
import CourseDetails from "./pages/students/CourseDetails";
import MyEnrollmanrs from "./pages/students/MyEnrollmanrs";
import Player from "./pages/students/Player";

import Educater from "./pages/educater/Educater";
import DashBorad from "./pages/educater/DashBorad";
import AddCourse from "./pages/educater/AddCourse";
import MyCourses from "./pages/educater/MyCourses";
import StudentsEroll from "./pages/educater/StudentsEroll";

import Navbar from "./components/students/Navbar";
import SyanUser from "./contexts/SyanUser";
import {ToastContainer} from "react-toastify"
import "quill/dist/quill.snow.css";

const App = () => {
  return (
    <div className="text-default min-h-screen bg-white">
      <ToastContainer/>
      <Navbar />
      {/* <SyanUser /> */}
      
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/course-list" element={<CourseList />} />
        <Route path="/course-list/:input" element={<CourseList />} />
        <Route path="/course/:id" element={<CourseDetails />} />

        {/* Protected Student Routes */}
        <Route
          path="/my-enrollmants"
          element={
            <SignedIn>
              <MyEnrollmanrs />
            </SignedIn>
          }
        />
        <Route
          path="/player/:courseId"
          element={
            <SignedIn>
              <Player />
            </SignedIn>
          }
        />

        {/* Protected Educater Routes */}
        <Route
          path="/educater/*"
          element={
            <SignedIn>
              <Educater />
            </SignedIn>
          }
        >
          <Route path="dashborad" element={<DashBorad />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="student-enrolled" element={<StudentsEroll />} />
        </Route>

        {/* Redirect non-signed-in users */}
        <Route
          path="*"
          element={
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
