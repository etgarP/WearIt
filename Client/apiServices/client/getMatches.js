import { fetchWithTimeout } from "../fetchWithTimeout";
import { constants } from "../../constants/api";

const API_URL = `${constants.clientBaseAddress}matches`; // Replace with your actual URL

export const getMatches = async (token) => {
    try {
        const response = await fetchWithTimeout(
            5000, // 5 seconds timeout
            fetch(API_URL, {
                method: 'GET',
                headers: {
                    'Authorization': `bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error(errorText)
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error.message); // Log error message
        throw error; // Re-throw the error for handling in the component
    }
};
