import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectDB from "./config/mongodb.js"

// import route 
import { clerkWebhooks, stripeWebhooks } from "./controllers/webhooks.js"
import { clerkMiddleware } from "@clerk/express"
import educatorRote from "./routes/educatorRoute.js"

import connectCloudinary from "./config/ cloudinary.js"
import courseRoute from "./routes/courseRoute.js"
import userRouter from "./routes/userRoute.js"

const app = express()

// Middlewares
app.use(cors())
app.use(clerkMiddleware())


// Connect to database
connectDB()
await connectCloudinary()

// Clerk webhook route (must be BEFORE express.json())
app.post(
  "/clerk",
  express.raw({ type: "application/json" }),
  clerkWebhooks
)
app.post(
  "/stripe",
  express.raw({ type: "application/json" }),
  stripeWebhooks
)

// Other routes
app.use(express.json())

app.use("/api/educator",educatorRote)
app.use('/api/course',courseRoute)
app.use("/api/user",userRouter)

app.get('/', (req, res) => {
  res.send('API WORKING 🚀')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`server running on port http://localhost:${PORT}`)
})
