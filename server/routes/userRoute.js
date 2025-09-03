import express from "express";
import User from "../models/user.js";

const router=express.Router();

router.post("/signup",async (req,res)=>{
  try {
      const { clerkId, name, email, imageUrl } = req.body;
      let user=await User.findOne({clerkId})
      if(user){
        console.log("User already exists")
        return res.status(200).json({ message: "User already exists", user });
      }
      user=new User({
        clerkId,
        name,
        email,
        imageUrl,
      })
      await user.save()
      return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
})
export default router;