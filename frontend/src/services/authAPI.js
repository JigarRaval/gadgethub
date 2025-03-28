import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// Register User
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error.response?.data?.message || error.message);
    return null;
  }
};

// Login User
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    if (response.data) {
      localStorage.setItem("userInfo", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error("Login failed:", error.response?.data?.message || error.message);
    return null;
  }
};

// Logout User
export const logoutUser = () => {
  localStorage.removeItem("userInfo");
};
