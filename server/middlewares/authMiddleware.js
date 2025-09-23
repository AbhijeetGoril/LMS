import { clerkClient, getAuth } from "@clerk/express";

export const protectEducator = async (req, res, next) => {
  try {
    // Use req.auth() as a function
    const {userId}=await getAuth(req)

    // Fetch the user from Clerk
    const response = await clerkClient.users.getUser(userId);
    // Check the role
    if (response.publicMetadata.role !== "educator") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    // Role is correct, continue
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message || "Authentication failed",
    });
  }
};
