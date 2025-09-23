import express from "express"
import { getAllCourse, getCourseById } from "../controllers/courseControllers.js"
const courseRoute=express.Router()
courseRoute.get('/all',getAllCourse)
courseRoute.get("/:id",getCourseById)

export default courseRoute;