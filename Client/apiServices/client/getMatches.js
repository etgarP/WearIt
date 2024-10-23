// apiService.js
const API_URL = 'http://10.0.2.2:12345/api/client/matches'; // Replace with your actual URL

export const getMatches = async (token) => {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Authorization': `bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

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
