// src/components/SyncUser.jsx
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import API from "../api/axios";

export default function SyncUser() {
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn || !user) return;

    const sync = async () => {
      try {
        const payload = {
          clerkId: user.id,
          name:
            user.fullName ||
            `${user.firstName || ""} ${user.lastName || ""}`.trim(),
          email:
            user.primaryEmailAddress?.emailAddress ||
            user.emailAddresses?.[0]?.emailAddress ||
            "",
          imageUrl: user.imageUrl || "",
        };

        console.log("📩 Sending to backend:", payload);

        const res = await API.post("/users/signup", payload);
        console.log("✅ User synced:", res.data);
      } catch (err) {
        console.error("❌ SyncUser error:", err.response?.data || err.message);
      }
    };

    sync();
  }, [isLoaded, isSignedIn, user]);

  return null;
}
