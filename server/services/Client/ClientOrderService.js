const Order = require('../../models/Order');
const DesignerProfile = require('../../models/desinger/DesignerProfile');
const Design = require('../../models/desinger/Design');
const Review = require('../../models/Review');
const { getClientImage } = require('../../services/Client/ClientInfoService')
/*  
    input: client username
    output: list of client orders
*/
const getClientOrders = async (username) => {
    return await Order.find({ username });
};

/*  
    input: client username, orderId
    output: if the order exists
*/
const orderIsFinished = async (username, designer) => {
    var finished = await Order.find({ designer, username, status: 'finished' })
    return finished != null
};

/*  
    input: username, order
    output: none
    adds the order to the database
*/
const purchaseOrder = async (username, order) => {
    image = getClientImage(username)
    // Add the client's image to the order
    const newOrder = new Order({ ...order, username, clientImage: clientInfo.image });

    // Save the order to the database
    const savedOrder = await newOrder.save();
    console.log("Saved Order:", savedOrder); // Check if order is saved
    // Create a corresponding design entry for the new order
    const newDesign = new Design({
        orderId: savedOrder._id,
        items: [] // Populate this with initial design entries as needed
    });
    const savedDesign = await newDesign.save();    
    return savedOrder;
};

/*  
    input: username, orderId
    output: if the username is the client in that order
*/
const isClientInOrder = async (orderId, username) => {
    // First find the order and check ownership
    const order = await Order.findOne({
        _id: orderId,
        username: username
    });

    return order != null
};


/*  
    input: username 
    output: all the designs for the client
    save the current design
*/
const getDesign = async (orderId, username) => {
    if (!isClientInOrder( orderId, username)) {
        throw new Error('Order not found or unauthorized access');
    }

    // Once verified, get the design
    const design = await Design.findOne({ orderId });
    if (!design) {
        throw new Error('Design not found');
    }

    return design;
};

/*  
    input: review
    output: None
    adds a new review to a profile page
*/
const addReview = async (username, reviewData) => {
    // Find and update the review if it exists, or create a new one if it doesn't (upsert)
    const review = await Review.findOneAndUpdate(
        { username, designerUsername: reviewData.designerUsername },
        {
            number: reviewData.number,
            review: reviewData.review
        }, // new: true returns the updated document and set, upsert inserts if not there
        { new: true, upsert: true, setDefaultsOnInsert: true } 
    );
    // Add the review ID to the designer's profile if it's not already present
    await DesignerProfile.findOneAndUpdate(
        { username: reviewData.designerUsername },
        { $addToSet: { reviews: review._id } } // $addToSet ensures the ID is not added multiple times
    );
};

const tryOn = async (username, orderId, url) => {
    if (!isClientInOrder(orderId, username)) {
        throw new Error('Order not found or unauthorized access');
    }
    const design = await Design.findOne({ orderId });
    if (!design) {
        throw new Error('Design not found for the given orderId');
    }

    // Check if an entry with the same URL already exists and update it
    const existingEntry = design.items.find(item => item.url === url);
    if (existingEntry) {
        existingEntry.imageOfCloth = path.join(__dirname, "cloth.png");
        existingEntry.imageOfWornCloth = path.join(__dirname, 'worn.png');
        existingEntry.typeOfCloth = 'shirt'; // Default type, can be modified as needed
    } 
    else {
        throw Error('no url')
    }

    // Save the updated design document
    const updatedDesign = await design.save();
    console.log("Updated Design:", updatedDesign); // Check if design is updated
    return updatedDesign;
};

module.exports = { orderIsFinished, addReview, getClientOrders, purchaseOrder, getDesign, tryOn };
