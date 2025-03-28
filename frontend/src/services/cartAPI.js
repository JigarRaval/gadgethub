import axios from "axios";

const API_URL = "http://localhost:5000/api/cart";

// Get user's cart by session ID
export const getCart = async (sessionId) => {
  try {
    const { data } = await axios.post(`${API_URL}`, { sessionId });
    return data.cart || { items: [], subtotal: 0, totalItems: 0 };
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

// Add item to cart
export const addToCart = async ({
  sessionId,
  productId,
  name,
  price,
  image,
  quantity = 1,
}) => {
  try {
    const { data } = await axios.post(`${API_URL}/add`, {
      sessionId,
      productId,
      name,
      price,
      image,
      quantity,
    });
    return data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

// Update cart item quantity
export const updateCartItem = async ({ sessionId, itemId, quantity }) => {
  try {
    // Convert quantity to number and validate
    const numQuantity = Number(quantity);
    if (isNaN(numQuantity) || numQuantity < 1) {
      throw new Error("Invalid quantity value");
    }

    const { data } = await axios.post(
      `${API_URL}/update`,
      {
        sessionId,
        itemId: String(itemId), // Ensure string ID
        quantity: numQuantity, // Ensure number quantity
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Error updating cart item:", error);
    throw error;
  }
};

// Remove item from cart
export const removeCartItem = async ({ sessionId, itemId }) => {
  try {
    const { data } = await axios.post(`${API_URL}/remove`, {
      sessionId,
      itemId,
    });
    return data;
  } catch (error) {
    console.error("Error removing cart item:", error);
    throw error;
  }
};

// Clear entire cart
export const clearCart = async (sessionId) => {
  try {
    const { data } = await axios.post(`${API_URL}/clear`, { sessionId });
    return data;
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw error;
  }
};

// Generate or retrieve session ID
export const getSessionId = () => {
  let sessionId = localStorage.getItem("sessionId");
  if (!sessionId) {
    sessionId =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    localStorage.setItem("sessionId", sessionId);
  }
  return sessionId;
};
