import {Webhook} from "svix"
import User from "../models/user.js"
import { json } from "express"

export const clerkWebhooks=async(req,res)=>{
  try {
      const whook= new Webhook(process.env.CLERK_WEBHOOK_SECRET)
      const payload =await whook.verify(JSON.stringify(req.body),{
        "svix-id":req.headers["svix-id"],
        "svix-timestamp":req.headers["svix-timestamp"],
        "svix-signature":req.headers["svix-signature"]
      })
      const {data,type}=payload
      switch(type){
        case 'user.created':{
          const userData={
            _id:data.id,
            email:data.email_addresses[0].email_address,
            name:data.first_name+" "+data.last_name,
            imageUrl:data.image_url,
          }
          await User.create(userData)
          
          break
        }
        case 'user.updated':{
          const userData={
            email:data.email_addresses[0].email_address,
            name:data.first_name+" "+data.last_name,
            imageUrl:data.image_url,
          }
          await User.findByIdAndUpdate(data.id,userData)
          
          break
        }
        case 'user.deleted':{
          await User.findByIdAndDelete(data.id)
          
          break
        }
      }
      res.json({});
  } catch (error) {
    res.status(400).json({success:false,message:error.message})
  }
}