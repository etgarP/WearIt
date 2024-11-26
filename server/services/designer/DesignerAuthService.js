const Designer = require("../../models/desinger/DesignerInfo");
const { DesignerLoginInfo } = require("../../models/LoginInfo");
const { DesignerProfile } = require("../../models/desinger/DesignerProfile");
const DesignerInfo = require("../../models/desinger/DesignerInfo");
const bcrypt = require("bcryptjs");

/*  
    input: username, password
    output: user
    authenticate a users password - check 
    its the same as the one in the database and returns the user
*/
const authenticate = async (username, password) => {
  const user = await DesignerLoginInfo.findOne({ username });
  if (user && (await bcrypt.compare(password, user.password))) {
    return user;
  }
  return null;
};

const createDefaultDesignerInfoAndProfile = async (username) => {
  // Default designer info using provided username
  const defaultDesignerInfo = {
    username: username, // Username passed into the function
    name: "Default Designer",
    gender: "Other",
    city: "Unknown City",
    religion: "Non",
    age: 30,
    specialization: ["Casual Wear", "Formal Wear"], // Default specializations
  };

  // Save the designer info and retrieve the _id
  const designer = new DesignerInfo(defaultDesignerInfo);
  const savedDesigner = await designer.save();
  const designerId = savedDesigner._id; // Get the _id of the saved designer

  // Default designer profile using the same username
  const defaultDesignerProfile = {
    username: defaultDesignerInfo.username, // Use the same username
    name: defaultDesignerInfo.name, // Default name
    bio: "This is a default bio. No bio provided yet.",
    image: "", // Default profile image
    pricePerItem: 50, // Default price per item
    specialization: defaultDesignerInfo.specialization, // Default specializations
    designerInfo: designerId, // Use the retrieved _id from DesignerInfo
  };

  // Create and save the designer profile
  const designerProfile = new DesignerProfile(defaultDesignerProfile);
  await designerProfile.save();
};

/*  
    input: username, password, designerInfo
    output: none
    signs up a Designer. uses bcrypt to hash its password into the database.
    adds a designer profile as well.
*/
const createDesigner = async (username, password) => {
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
    // Save the login info
  const loginInfo = new DesignerLoginInfo({ username, password: hashedPassword });
  await loginInfo.save();

  // Set default info and profile
  createDefaultDesignerInfoAndProfile(username);
};

module.exports = { authenticate, createDesigner };
