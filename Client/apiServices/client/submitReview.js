import { fetchWithTimeout } from "../fetchWithTimeout";


export const submitReview = async (token, reviewData) => {
    const API_URL = `http://10.0.2.2:12345/api/client/orders/review` // Adjust the base URL if needed
    try {
        const response = await fetchWithTimeout(
            5000, // 5 seconds timeout
            fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`, // Ensure correct capitalization
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ review: reviewData }),
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
