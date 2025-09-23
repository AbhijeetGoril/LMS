import { getAuth } from "@clerk/express";
import User from "../models/user.js";
import Course from "../models/course.js";
import Stripe from "stripe";
import { Purchase } from "../models/Purchase.js";
import { CourseProgress } from "../models/courseProgress.js";


export const  getUserData=async (req,res)=>{
  try {
    const {userId}=await getAuth(req)
    const user = await User.findOne({ clerkId: userId });
    if(!user){
      return res.json({success:false,message:"User not found"})
    }
    res.json({success:true,user})
  } catch (error) {
    res.json({success:false,message:error.message})
  }
}
export const userErolledCourses= async(req,res)=>{
  try {
    const {userId}=await getAuth(req)
    const userData = await User.findOne({ clerkId: userId }).populate('enrolledCourses');
    if(!userData){
      return res.json({success:false,message:"User not found"})
    }
    res.json({success:true,enrolledCourses:userData.enrolledCourses})
  } catch (error) {
    res.json({success:false,message:error.message})
  }
}

export const purchaseCourse= async(req,res)=>{
  try {
    const {courseId}=req.body
    const {origin}=req.headers
    const {userId}=await getAuth(req)
    const userData = await User.findOne({ clerkId: userId })

    const courseData=await Course.findById(courseId)
    if(!userData || !courseData ){
      return res.json({success:false,message:"Data not found"})
    }
    const purchaseData={
      courseId:courseData._id,
      userId,
      amount:(courseData.coursePrice-((courseData.discount* courseData.coursePrice)/100)).toFixed(2)
    }
    const newPurchase=await Purchase.create(purchaseData)
    
    const stripeInstance= new Stripe(process.env.STRIPE_SECRET_KEY)
    const currency= process.env.CURRENCY.toLowerCase()
    const line_Items=[{
      price_data:{
        currency,
        product_data:{
          name:courseData.courseTitle,
        },
        unit_amount:Math.floor(newPurchase.amount)*100
      },
      quantity:1
    }]
    const session= await stripeInstance.checkout.sessions.create({
      success_url:`${origin}/loading/my-enrollments`,
      cancel_url:`${origin}/`,
      line_items:line_Items,
      mode:"payment",
      metadata:{purchaseId:newPurchase._id.toString()}
    })
    res.json({success:true,session_url:session.url})
  } catch (error) {
    res.json({success:false,message:error.message})
  }
}

export const updateUserCourseProgress=async (req,res)=>{
  try {
    const {userId}=await getAuth(req)

    const {courseId,lectureId}=req.body
    const processData=await CourseProgress.findOne({courseId,userId})
    if(processData){
      if(processData.lectureCompleted.includes(lectureId)){
        return res.json({success:true,message:"Lecture is already add"})
      }
      processData.lectureCompleted.push(lectureId)
      await processData.save();
    }else{
      const progress = new CourseProgress({
      userId: userId,
      courseId: courseId,
      completed: false,
      lectureCompleted: [lectureId] 
    })
    await progress.save();
    }
    return res.json({success:true,message:"Lecture is  added"})
  } catch (error) {
    return res.json({success:false,message:error.message})
  }
}


export const getUserCourseProgress=async(req,res)=>{
  try {
    const {userId}= getAuth(req)
    const {courseId}=req.body
    const progressData=await CourseProgress.findOne({courseId,userId})
   return res.json({success:true,progressData})
  } catch (error) {
    return res.json({success:false,message:error.message})
  }
}

export const addCourseRating=async(req,res)=>{
   const {userId}= getAuth(req)
   
    const {courseId,rating}=req.body
    console.log("courseId:- ",courseId)
    if(!userId || !courseId || !rating ||rating<1 ||rating>5){
      return res.json({success:false,message:"Invalid detail "})
    }
    try {
    const userData=await User.findOne({clerkId:userId})
    const CourseData=await Course.findById(courseId)
    
    if(!CourseData){
      return res.json({success:false,message:"Course Not found"})
    }
    if(!userData){
      return res.json({success:false,message:"User Not found"})
    }
    if(!userData.enrolledCourses.includes(courseId)){
      return res.json({success:false,message:"User Not purchase the course"})
    }

    const existingIndex = CourseData.courseRatings.findIndex(
    r => r.userId.equals(userData._id)   
    );

    if(existingIndex>-1){
      CourseData.courseRatings[existingIndex].rating=rating
      await CourseData.save()
      return res.json({success:true,message:"Rating updated"})
    }
    CourseData.courseRatings.push({userId:userData._id,rating})
    await CourseData.save()
    return res.json({success:true,message:"Rating uploaded"})
  } catch (error) {
    return res.json({success:false,message:error. message})
  }
}