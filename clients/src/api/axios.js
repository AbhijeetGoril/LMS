import axios from "axios";

// Backend base URL (from .env or fallback to localhost)
const BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api";

// Create axios instance
const API = axios.create({
  baseURL: BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Export for use in frontend
export default API;