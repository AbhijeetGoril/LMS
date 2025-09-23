import express from "express";

import { addCourseRating, getUserCourseProgress, getUserData, purchaseCourse, updateUserCourseProgress, userErolledCourses } from "../controllers/userController.js";

const userRouter=express.Router();
userRouter.get("/data",getUserData)
userRouter.get("/enrolled-courses",userErolledCourses)
userRouter.post("/purchase",purchaseCourse)
userRouter.post("/updateCourseProgress",updateUserCourseProgress)
userRouter.get("/getCourseProgress",getUserCourseProgress)
userRouter.post("/add-course-rating",addCourseRating)

export default userRouter;