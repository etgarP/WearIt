// Helper function to create a timeout promise
export const fetchWithTimeout = (timeout, promise) => {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error('Request timed out after 5 seconds'));
        }, timeout);

        promise
            .then((response) => {
                clearTimeout(timer);
                resolve(response);
            })
            .catch((error) => {
                clearTimeout(timer);
                reject(error);
            });
    });
};