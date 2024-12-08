import { fetchWithTimeout } from "../fetchWithTimeout";
import { constants } from "../../constants/api";

export const getDesign = async (token, orderId) => {
    const API_URL = `${constants.clientBaseAddress}orders/${orderId}`; 
    try {
        const response = await fetchWithTimeout(
            5000, // 5 seconds timeout
            fetch(API_URL, {
                method: 'GET',
                headers: {
                    'Authorization': `bearer ${token}`, // Ensure correct capitalization
                    'Content-Type': 'application/json',
                },
            })
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error:', errorText);
            throw new Error(errorText); // Throw error to be caught in the calling function
        }

        return await response.json(); // This should return the array of orders
    } catch (error) {
        console.error('Error fetching orders:', error.message);
        throw error; // Ensure error is caught and handled appropriately
    }
};
