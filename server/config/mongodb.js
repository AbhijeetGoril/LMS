import mongoose from "mongoose"
import 'dotenv/config'

const connectDB= async()=>{

  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("Mongo db connected successfully")
  } catch (error) {
    console.log("Error while connected to db :- ", error)
  }
}
export default connectDB