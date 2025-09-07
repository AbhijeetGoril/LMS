import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectDB from "./config/mongodb.js"

// import route 
import { clerkWebhooks } from "./controllers/webhooks.js"

const app=express()


//middlewares
app.use(cors())
app.use(express.json())
// connect to data server
connectDB()

// Routes

app.get('/',(req,res)=>{
  res.send('API WORKINGs')
})

app.use("/clerk", express.json(),clerkWebhooks);
// port 

const PORT=process.env.PORT|| 3000
app.listen(PORT,()=>{
  console.log(`server running on port http://localhost:${PORT}`)
})