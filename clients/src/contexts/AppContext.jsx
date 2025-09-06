import { useEffect, useState } from "react"
import { AppContext } from "./Context"
import {  dummyCourses } from "../assets/assets"
import humanizeDuration from  "humanize-duration"

const AppContextProvider=({children})=>{
    const currency=import.meta.env.VITE_CURRENCY
    const [allCourses, setAllCourses] = useState([])
    const [isEducater, isSetEducater] = useState(true)
    const [enrolledCourse,setEnrolledCourse ] = useState([])
    const fatchAllCourses= async()=>{
        setAllCourses(dummyCourses )
    }
    const calculateRating = (course)=>{
        if(course.courseRatings.length===0){
            return 0;
        }
        let totalRating=0;
        course.courseRatings.forEach((rating)=>{
            totalRating+=rating.rating;
        })
        return totalRating/course.courseRatings.length;
    
    }

    // Function to Calulate course chapter time
    const calcutateChapterTime = (chapter)=>{
       let time=0
       chapter.chapterContent.map((lecture)=>time+=lecture.lectureDuration)
       return humanizeDuration(time*60*1000,{units:["h","m"] } ) 
        
    }

    // Function to Course course chapter time
    const calcutateCourseTime = (course)=>{
        let time=0
        course.courseContent.map((chapter)=>chapter.chapterContent.map((lecture)=>time+=lecture.lectureDuration))
        return humanizeDuration(time*60*1000,{units:["h","m"] } )    
     }
    // Function to Course course chapter time
   

      // Function to Course course chapter time
    const calcutateNoOfLecture = (course)=>{
        let totalLecture=0
        course.courseContent.map((chapter)=>{if(Array.isArray(chapter.chapterContent)) totalLecture+= chapter.chapterContent.length})  
        return totalLecture;  
     }

    // Fatch the enrolledCourses 
    const fatchErolledCourses= async()=>{
       setEnrolledCourse(dummyCourses)
    }
    useEffect(()=>{
        fatchAllCourses()
        fatchErolledCourses()   
    },[])
    


    const value={
        currency,
        allCourses,
        calculateRating,
        isEducater,
        isSetEducater,
        calcutateChapterTime,
        calcutateCourseTime,
        calcutateNoOfLecture,
        enrolledCourse,
        fatchErolledCourses
    }
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}
export default AppContextProvider;