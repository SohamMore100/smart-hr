import axios from "axios";

// Create an Axios instance
const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // Update this URL based on your backend API
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Assuming you store the auth token in localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized! Redirecting to login...");
      // Handle logout or redirect to login page
      localStorage.removeItem("token");
    //   window.location.href = "/login"; // Update the redirect URL if needed
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
