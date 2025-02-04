import { fetchWithTimeout } from "../fetchWithTimeout";
import { constants } from "../../constants/api";

const API_URL = `${constants.clientBaseAddress}orders`;

export const createOrder = async (orderDetails, token) => {
  try {
    const response = await fetchWithTimeout(
      5000, // 5 seconds timeout
      fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order: orderDetails }),
      })
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error:", errorText);
      throw new Error(errorText); // Throw error to be caught in the calling function
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating order:", error.message);
    throw error;
  }
};
