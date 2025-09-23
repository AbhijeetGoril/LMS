import { Webhook } from "svix";
import User from "../models/user.js";
import { StrictMode } from "react";
import Stripe from "stripe";
import { Purchase } from "../models/Purchase.js";
import course from "../models/course.js";
export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // ✅ Convert raw Buffer into string
    const payload = req.body.toString("utf8");
  
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // ✅ Verify and parse Clerk event
    const event = whook.verify(payload, headers);

    console.log("Webhook verified:", event);

    const { type, data } = event; // Clerk sends these

    switch (type) {
      case "user.created": {
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          imageUrl: data.image_url,
        };
        await User.create(userData);
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          imageUrl: data.image_url,
        };
        await User.findOneAndUpdate({ clerkId: data.id }, userData);
        break;
      }

      case "user.deleted": {
        await User.findOneAndDelete({ clerkId: data.id });
        break;
      }

      default:
        console.log(`Unhandled event type: ${type}`);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};
const stripeInstance=new Stripe(process.env.STRIPE_SECRET_KEY)
export const stripeWebhooks=async(request,response)=>{
   const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = Stripe.webhooks.constructEvent(request.body, sig,process.env.STRIPE_WEBHOOK_KEY );
    
  }

  catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
  }
  switch (event.type) {
    case 'payment_intent.succeeded':{
      const paymentIntent = event.data.object;
      const paymentIntentId=paymentIntent.id
      const session=await stripeInstance.checkout.sessions.list({
        payment_intent:paymentIntentId
      })
      const {purchaseId}=session.data[0].metadata
      const purchaseData= await Purchase.findById(purchaseId)
      const userData= await User.findOne({clerkId: purchaseData.userId})
      const courseData=  await course.findById(purchaseData.courseId.toString())
      courseData.enrolledStudents.push(userData)
      await courseData.save()
      userData.enrolledCourses.push(courseData._id)
      await userData.save()
      purchaseData.status="completed"
      await purchaseData.save()
      break;
    }
    case 'payment_intent.payment_failed':{
      const paymentIntent = event.data.object;
      const paymentIntentId=paymentIntent.id
      const session=await stripeInstance.checkout.sessions.list({
        payment_intent:paymentIntentId
      })
      const purchaseData= await Purchase.findById(paymentIntentId)
      purchaseData.status="failed"
      purchaseData.save()
      break;
    }
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  response.json({received: true});
}