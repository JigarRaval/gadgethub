import axios from "axios";

const API_URL = "http://localhost:5000/api/orders";

// Get all orders
export const getOrders = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem("userInfo")?.token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error.response?.data?.message || error.message);
    return [];
  }
};

// Create a new order
export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(API_URL, orderData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("userInfo")?.token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error.response?.data?.message || error.message);
    return null;
  }
};

// Update order status
export const updateOrderStatus = async (id, status) => {
  try {
    const response = await axios.put(
      `${API_URL}/${id}`,
      { status },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("userInfo")?.token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating order:", error.response?.data?.message || error.message);
    return null;
  }
};
