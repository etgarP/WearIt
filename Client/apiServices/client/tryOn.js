import { constants } from "../../constants/api";

if (!AbortSignal.timeout) {
    AbortSignal.timeout = function (ms) {
        const controller = new AbortController();
        setTimeout(() => controller.abort(), ms);
        return controller.signal;
    };
}


export const fetchTimeout = async (url, ms, { signal, ...options } = {}) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), ms);

    if (signal) {
        signal.addEventListener('abort', () => controller.abort());
    }

    return fetch(url, { ...options, signal: controller.signal })
        .finally(() => clearTimeout(timeoutId));
};


// `tryOn` function
export const tryOn = async (token, url, orderId) => {
    const API_URL = `${constants.clientBaseAddress}orders/try-on`;
    try {
        // Timeout set to 5 minutes (300,000ms)
        const response = await fetchTimeout(API_URL, 300000, {
            method: 'POST',
            headers: {
                'Authorization': `bearer ${token}`, // Ensure correct capitalization
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ orderId, url }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error:', errorText);
            throw new Error(errorText); // Throw error to be caught in the calling function
        }

        const data = await response.json();
        return data; // Return the parsed JSON
    } catch (error) {
        if (error.name === "AbortError") {
            console.error("Request aborted due to timeout or manual cancellation.");
        } else {
            console.error("Error fetching orders:", error.message);
        }
        throw error; // Ensure error is caught and handled appropriately
    }
};
