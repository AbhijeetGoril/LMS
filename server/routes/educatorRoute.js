import express from "express"
import { courseUpload, getEducatorCourses, getErolledStudentsData, updateRoleToEducator } from "../controllers/educatorControllers.js"
import upload from "../config/upload.js"
import { protectEducator } from "../middlewares/authMiddleware.js"
const educatorRote=express.Router()
educatorRote.get("/update-role",updateRoleToEducator)
educatorRote.post("/add-course",upload.single("image"),protectEducator,courseUpload)
educatorRote.get("/courses",protectEducator,getEducatorCourses)
educatorRote.get("/enrolled-students",protectEducator,getErolledStudentsData)

export default educatorRote