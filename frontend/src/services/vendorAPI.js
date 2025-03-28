import axios from "axios";

const API_URL = "http://localhost:5000/api/vendors";

// Configure axios to send credentials with every request
axios.defaults.withCredentials = true;

// Login vendor
const loginVendor = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Login failed" };
  }
};

// Get vendor profile
const getVendorProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/profile`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Failed to fetch profile" };
  }
};

// Logout vendor
const logoutVendor = async () => {
  try {
    const response = await axios.post(`${API_URL}/logout`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Logout failed" };
  }
};

export default {
  loginVendor,
  getVendorProfile,
  logoutVendor,
};
