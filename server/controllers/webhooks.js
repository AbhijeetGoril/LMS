import { Webhook } from "svix"
import User from "../models/user.js"

// IMPORTANT: in your server setup, use raw body middleware ONLY for this route:
// app.use("/api/webhooks/clerk", express.raw({ type: "application/json" }), clerkWebhooks)

export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

    // Verify Clerk event
    const payload = whook.verify(req.body, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    })

    const { data, type } = payload

    switch (type) {
      case "user.created": {
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          imageUrl: data.image_url,
        }
        await User.create(userData)
        break
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          imageUrl: data.image_url,
        }
        await User.findOneAndUpdate({ clerkId: data.id }, userData)
        break
      }

      case "user.deleted": {
        await User.findOneAndDelete({ clerkId: data.id })
        break
      }
    }

    res.status(200).json({ success: true })
  } catch (error) {
    console.error("Webhook error:", error.message)
    res.status(400).json({ success: false, message: error.message })
  }
}
