import axios from "axios";

// Set base URL (Replace with your VM External IP or domain)
const API_BASE_URL = process.env.REACT_APP_API_URL || "https://backend-21569344527.asia-southeast2.run.app/";

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
