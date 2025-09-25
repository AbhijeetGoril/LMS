import { useEffect, useState } from "react"
import { AppContext } from "./Context"
import humanizeDuration from  "humanize-duration"
import {useAuth, useUser} from "@clerk/clerk-react"

import API from "../api/axios"
import { toast } from "react-toastify"

const AppContextProvider=({children})=>{
    const currency=import.meta.env.VITE_CURRENCY
    const [allCourses, setAllCourses] = useState([])
    const {getToken}=useAuth()
    const {user}=useUser()
    const [isEducater, isSetEducater] = useState(false)
    const [enrolledCourse,setEnrolledCourse ] = useState([])
    const [userData,setUserData]=useState(null)
    const fatchAllCourses= async()=>{
        try {
            const {data}=await API.get("course/all")
            if(data.success){
                setAllCourses(data.courses)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    const calculateRating = (course)=>{
        if(course.courseRatings.length===0){
            return 0;
        }
        let totalRating=0;
        course.courseRatings.forEach((rating)=>{
            totalRating+=rating.rating;
        })
        return Math.floor(totalRating/course.courseRatings.length);
    
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
        course.courseContent?.map((chapter)=>chapter.chapterContent.map((lecture)=>time+=lecture.lectureDuration))
        return humanizeDuration(time*60*1000,{units:["h","m"] } )    
     }
    // Function to Course course chapter time
   

      // Function to Course course chapter time
    const calcutateNoOfLecture = (course)=>{
        let totalLecture=0
        course.courseContent?.map((chapter)=>{if(Array.isArray(chapter.chapterContent)) totalLecture+= chapter.chapterContent.length})  
        return totalLecture;  
     }

    // Fatch the enrolledCourses 
    const fatchErolledCourses= async()=>{
        try {
            const token= await getToken()
            const {data}= await API.get("user/enrolled-courses",{headers:{Authorization:`Bearer ${token}`}})
            if(data.success){
                setEnrolledCourse(data.enrolledCourses.reverse())
            }else{
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error.message)
        }
      
    }
     

    // fatch userData

    const fatchUserData=async()=>{
        if(user.publicMetadata.role==="educator"){
            isSetEducater(true)
        }
        try {
            const token= await getToken();
            const {data}=await API.get("user/data",{headers:{Authorization:`Bearer ${token}`}})
            if(data.success){
                setUserData(data.user)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error.mesage)
        }
    }

    useEffect(()=>{
        if(user){
            fatchUserData()
            fatchErolledCourses() 
        }
    },[user])

    const lg=async ()=>{
    const token= await getToken()
        console.log(token)
    }
    if(user){
            lg()
        }
    useEffect(()=>{
        
        fatchAllCourses()
    }
    ,[])


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
        fatchErolledCourses,
        userData,
        setUserData,
        fatchAllCourses,
    }
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}
export default AppContextProvider;