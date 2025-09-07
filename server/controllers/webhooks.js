import { Webhook } from "svix";
import User from "../models/user.js";

export const clerkWebhooks = async (req, res) => {
  try {
    console.log("hello")
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const payload = await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = payload;
    const email = data.email_addresses?.[0]?.email_address || "";

    console.log("Clerk ID:", data.id);
    console.log("Email:", email);

    switch (type) {
      case "user.created":
        await User.create({
          clerkId: data.id,
          email,
          name: (data.first_name || "") + " " + (data.last_name || ""),
          imageUrl: data.image_url,
        });
        break;

      case "user.updated":
        await User.findOneAndUpdate(
          { clerkId: data.id },
          {
            email,
            name: (data.first_name || "") + " " + (data.last_name || ""),
            imageUrl: data.image_url,
          }
        );
        break;

      case "user.deleted":
        await User.findOneAndDelete({ clerkId: data.id });
        break;
    }

    res.json({});
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
