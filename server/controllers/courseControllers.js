import Course from "../models/course.js";

export const getAllCourse=async(req,res)=>{
  try {
      const courses=await Course.find({isPublished:true}).select(["-chapters","-enrolledStudents"]).populate({path:"educator"})
      res.json({success:true,courses})
  } catch (error) {
    res.json({success:false,message:error.message})
  }
}

// Get course by id 
export const getCourseById=async(req,res)=>{
    const {id}=req.params
  try {
      const courseData=await Course.findById(id).populate({path:"educator"})
      courseData.chapters.forEach(chapter=>{
        chapter.chapterContent.forEach(lecture=>{
          if (!lecture.isPreviewFree) {
      lecture.lectureUrl = ""; // hide URL
    }
        })
      })
      res.json({success:true,courseData})
  } catch (error) {
    res.json({success:false,message:error.message})
  }
}