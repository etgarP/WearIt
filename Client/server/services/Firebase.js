let messaging

const getMessaging = (gotten) => {
    messaging = gotten
}
// sends a message to the user that it was sent to
const sendMessage = (theMessage, sender, token) => {
  const message = {
      token: token, 
      notification: {
        title: sender,
        body: theMessage,
      }
    };
    
    // Send the message to the device token
    messaging
      .send(message)
}
// sends that a contact was added
const addContact = (friend, token) => {
  const message = {
      token: token, 
      notification: {
        title: "Friend Added!",
        body: friend,
      }
    };
    
    // Send the message to the device token
    messaging
      .send(message)
}
// sends that a contact was removed
const removeContact = (friend, token) => {
  const message = {
      token: token, 
      notification: {
        title: "Friend removed :(",
        body: friend,
      }
    };
    
    // Send the message to the device token
    messaging
      .send(message)
}

module.exports = { removeContact, addContact, sendMessage, getMessaging }