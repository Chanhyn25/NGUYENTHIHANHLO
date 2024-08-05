const API_URL = "http://localhost:3000/orders";

const getOrders = async () => {
  try {
    const data = await utils.fetchFromApi(API_URL);
    return data;
  } catch (error) {
    console.error("Failed to fetch orders:", error.message);
    alert("Failed to fetch orders. Please try again.");
    return [];
  }
};

const getOrderById = async (orderId) => {
  try {
    const data = await utils.fetchFromApi(`${API_URL}/${orderId}`);
    return data;
  } catch (error) {
    console.error("Failed to fetch order:", error.message);
    alert("Failed to fetch order. Please try again.");
    return null;
  }
};

const addOrder = async (order) => {
  try {
    await utils.fetchFromApi(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
    alert("Order added successfully");
  } catch (error) {
    console.error("Failed to add order:", error.message);
    alert("Failed to add order. Please try again.");
  }
};

const updateOrder = async (orderId, updatedOrder) => {
  try {
    await utils.fetchFromApi(`${API_URL}/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedOrder),
    });
    alert("Order updated successfully");
  } catch (error) {
    console.error("Failed to update order:", error.message);
    alert("Failed to update order. Please try again.");
  }
};

const deleteOrder = async (orderId) => {
  try {
    await utils.fetchFromApi(`${API_URL}/${orderId}`, {
      method: "DELETE",
    });
    alert("Order deleted successfully");
  } catch (error) {
    console.error("Failed to delete order:", error.message);
    alert("Failed to delete order. Please try again.");
  }
};
