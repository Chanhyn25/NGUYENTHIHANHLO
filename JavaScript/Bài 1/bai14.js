const API_URL = "http://localhost:3000/orders";

const getOrders = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch orders:", error.message);
    alert("Failed to fetch orders. Please try again.");
    return [];
  }
};

const getOrderById = async (orderId) => {
  try {
    const response = await fetch(`${API_URL}/${orderId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch orders:", error.message);
    alert("Failed to fetch orders. Please try again.");
    return null;
  }
};

const addOrder = async (order) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    alert("Order added successfully");
  } catch (error) {
    console.error("Failed to add order:", error.message);
    alert("Failed to add order. Please try again.");
  }
};

const updateOrder = async (orderId, updatedOrder) => {
  try {
    const response = await fetch(`${API_URL}/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedOrder),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    alert("Order updated successfully");
    return data;
  } catch (error) {
    console.error("Failed to update order:", error.message);
    alert("Failed to update order. Please try again.");
  }
};

const deleteOrder = async (orderId) => {
  try {
    const response = await fetch(`${API_URL}/${orderId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    alert("Order deleted successfully");
  } catch (error) {
    console.error("Failed to delete order:", error.message);
    alert("Failed to delete order. Please try again.");
  }
};
