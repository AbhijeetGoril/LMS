import mongoose from "mongoose";

const courseProgresSchema=  new mongoose.Schema({
  userId:{type:String,required:true},
  courseId:{type:String,required:true},
  completed:{type:Boolean,default:false},
  lectureCompleted:[]
},{minimize:true})

export const CourseProgress=mongoose.model('CourseProgress',courseProgresSchema)