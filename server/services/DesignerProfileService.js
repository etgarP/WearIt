const DesignerProfile = require('../models/DesignerProfile');

/*  
    input: username 
    output: profile of the designer 
*/
const getProfile = async (username) => {
    return await DesignerProfile.findOne({ username });
};

/*  
    input: designer username and profile
    output: None
    updates the profile
*/
const saveProfile = async (username, profile) => {
    await DesignerProfile.findOneAndUpdate({ username }, profile, { upsert: true });
};

/*  
    input: username, review
    output: None
    adds a new review to a profile page
*/
const addReview = async (username, reviewData) => {
    const review = new Review({ designerUsername: reviewData.designerUsername, number: reviewData.number, review: reviewData.review });
    await review.save();
    await DesignerProfile.findOneAndUpdate(
        { username: reviewData.designerUsername },
        { $push: { reviews: review._id } }
    );
};


module.exports = { addReview, getProfile, saveProfile };
