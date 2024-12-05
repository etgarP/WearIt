const queue = []; // Shared queue

const tryOn = async (orderId, url, username) => {
    // Add to queue
    queue.push({ orderId, url, username });
    console.log("before wait", orderId)
    // Wait until it's the only item in the queue
    await waitForTurn(orderId);
    console.log("after wait", orderId)
    // Simulate processing
    result = processTryOn(orderId, url, username)
    // Remove from queue
    queue.shift();
    return result
};

const waitForTurn = async (orderId) => {
    while (queue[0]?.orderId !== orderId) {
        // Wait for a short period before checking again
        await new Promise((resolve) => setTimeout(resolve, 100));
    }
};

// Simulated external function for processing
const processTryOn = async (orderId, url, username) => {
    // return ("done with order:", orderId)
    console.log(`yay ${orderId}`)
    return `yay ${orderId}`
};

module.exports = tryOn;


// Example usage
(async () => {
    const result1 = tryOn(1, 'http://example.com', 'user1');
    const result2 = tryOn(2, 'http://example.com/2', 'user2'); // Will wait until the first one is processed
    const result3 = tryOn(3, 'http://example.com/3', 'user3'); // Will wait until the second one is processed
    const result4 = tryOn(4, 'http://example.com/4', 'user4'); 
    const result5 = tryOn(5, 'http://example.com', 'user1');
    const result6 = tryOn(6, 'http://example.com/2', 'user2'); // Will wait until the first one is processed
    const result7 = tryOn(7, 'http://example.com/3', 'user3'); // Will wait until the second one is processed
    const result8 = tryOn(8, 'http://example.com/4', 'user4'); 
    const result9 = tryOn(9, 'http://example.com', 'user1');
    const result10 = tryOn(10, 'http://example.com/2', 'user2'); // Will wait until the first one is processed
    const result11 = tryOn(11, 'http://example.com/3', 'user3'); // Will wait until the second one is processed
    const result12 = tryOn(12, 'http://example.com/4', 'user4'); 

    // console.log(await result1); // Logs the result of the first item
    // console.log(await result2); // Logs the result of the second item
    // console.log(await result3); // Logs the result of the third item
    // console.log(await result4); // Logs the result of the third item
})();
