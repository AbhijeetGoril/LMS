import { clerkClient, getAuth } from "@clerk/express"; 
import { v2 as cloudinary} from "cloudinary";
import Course from "../models/course.js";
import educatorRote from "../routes/educatorRoute.js";
import course from "../models/course.js";
import { Purchase } from "../models/Purchase.js";
import User from "../models/user.js";

export async function updateRoleToEducator(req,res) {
    
    try {
      const {userId}=getAuth(req)
      const updatedUser= await clerkClient.users.updateUserMetadata(userId,{
        publicMetadata:{
          role:"educator"
        }
      })
      res.json({success:true,message:"You can publish a course nowf"})
    } catch (error) {
      res.json({success:false,message:error.message})
    }
}

export async function courseUpload(req,res) {
  try {
      const {courseData}=req.body;
      const imgleFile=req.file
      
      
      const {userId}=await getAuth(req)
      
     
      if (!userId) {
        return res.json({ success: false, message: "User not authenticated" });
      }

      if(!imgleFile){
        return res.json({success:false,message:"Thumnail not attacted"})
      }
        // find mongo user by clerkId
    const educator = await User.findOne({ clerkId: userId });
    if (!educator) {
      return res.json({ success: false, message: "Educator not found in DB" });
    }
      const parseCousresData= await JSON.parse(courseData)
      parseCousresData.educator=educator._id
      const newCourse= await Course.create(parseCousresData)
      const imagleUpload= await cloudinary.uploader.upload(imgleFile.path)
      newCourse.courseThumbnail=imagleUpload.secure_url
      await newCourse.save()
      res.json({success:true,message:"Course Added"})
  } catch (error) {
      res.json({success:false,message:error.message})
  }
}


export const getEducatorCourses = async (req, res) => {
  try {
    // Get the userId from Clerk session
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ success: false, message: "User not authenticated" });
    }
    console.log(userId)
    // Find all courses for this educator
    const courses = await Course.find({ educator: userId });

    res.json({ success: true, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const educatorDashboard=async(req,res)=>{
  try {
    const { userId } = getAuth(req);
    const courses = await Course.find({ educator: userId });
    const totalCourses=courses.length
    const coursesIds=courses.map(course=>course._id)
    const purchases=await Purchase.find({
      courseId:{$in:coursesIds},
      status:"completed"
    })
    const totalEranings= purchases.reduce((sum,purchase)=>sum+purchase.amount,0)
    const enrolledStudentsData=[]
    for(const course of courses){
      const students=await User.find({_id:course.enrolledStudents},"name imageUrl")
      students.forEach(student=>enrolledStudentsData.push({
        courseTitle:course.courseTitle,
        student
      }))
    }
    res.json({success:true,dashboardData:{totalCourses,totalEranings,enrolledStudentsData}})
  } catch (error) {
    res.json({success:false,message:error.message})
  }
}

export const getErolledStudentsData = async (req,res)=>{
    try {
        const { userId } = getAuth(req);
        const courses = await Course.find({ educator: userId });
        const coursesIds=courses.map(course=>course._id) 
        const purchase= await Purchase.find({
          courseId:{$in:coursesIds},
          status:"completed"
        }).populate("userId",'name imageUrl').populate('courseId','couseTitle')
        const enrolledStudents= purchase.map(purchase=>({
          student:purchase.userId,
          courseTitle:purchase.courseId.courseTitle,
          purchaseData:purchase.createdAt
        }))
        res.json({success:true,enrolledStudents})
    } catch (error) {
      res.json({success:false,enrolledStudents})
    }
}