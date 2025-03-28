import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

// Get all products
export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error.response?.data?.message || error.message);
    return [];
  }
};

// Add a new product (Admin Only)
export const addProduct = async (productData) => {
  try {
    const response = await axios.post(API_URL, productData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("userInfo")?.token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error.response?.data?.message || error.message);
    return null;
  }
};

// Update a product (Admin Only)
export const updateProduct = async (id, productData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, productData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("userInfo")?.token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error.response?.data?.message || error.message);
    return null;
  }
};

// Delete a product (Admin Only)
export const deleteProduct = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("userInfo")?.token}` },
    });
    return true;
  } catch (error) {
    console.error("Error deleting product:", error.response?.data?.message || error.message);
    return false;
  }
};
export const getProductById = async (id) => {
  try {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const response = await axios.get(`${API_URL}/api/products/${id}`);
    
    if (response.status === 400) {
      throw new Error(response.data.message || "Invalid product ID format");
    }
    
    if (response.status === 404) {
      throw new Error("Product not found");
    }
    
    return response;
  } catch (error) {
    console.error('Error fetching product details:', error);
    
    // Enhanced error handling
    if (error.response) {
      // Server responded with error status
      throw new Error(error.response.data.message || "Failed to fetch product");
    } else if (error.request) {
      // Request was made but no response
      throw new Error("No response from server. Please check your connection.");
    } else {
      // Other errors
      throw new Error("Failed to fetch product details");
    }
  }
};

export const getRelatedProducts = async (category, excludeId) => {
  try {
    const response = await axios.get(`${API_URL}/related`, {
      params: { category, excludeId }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching related products:", error);
    return []; // Return empty array if error occurs
  }
};