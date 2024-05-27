const chatService = require('../services/Chats')
const userService = require('../services/Users')
const jwt = require('jsonwebtoken')
const firebaseService = require('../services/Firebase')
let io

//Returns array of the last chats
const getChats = async (req, res) => {
    let decoded
    try {
        // verifing a user
        if (!req.headers.authorization) {
            return res.status(400).send("Bad request")
        }
        let aut = req.headers.authorization
        const words = aut.split(' ')
        const token = words[1];
        decoded = jwt.verify(token, 'hemi-hemi-is-never-gonna-give-you-up');
    } catch (error) {
        return res.status(401).send("Unable to authenticate");
    }
    try {
        // gets the chats
        let chats = await chatService.getUserChats(decoded.username)
        if(req.headers.firebasetoken) {
            await userService.createUserWithToken(decoded.username, req.headers.firebasetoken)
        }
        return res.status(200).send(chats)
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
}

// adds a chat with a user
const postChat = async (req, res) => {
    let decoded
    try {
        // verifing a user
        if (!req.headers.authorization) {
            return res.status(400).send("Bad request")
        }
        let aut = req.headers.authorization
        const words = aut.split(' ')
        const token = words[1];
        decoded = jwt.verify(token, 'hemi-hemi-is-never-gonna-give-you-up');
    } catch (error) {
        return res.status(401).send("Unable to authenticate");
    }
    try {
        // checks for bad request
        if (!req.body.username || req.body.username == decoded.username) {
            return res.status(400).send("Bad request");
        }
        // checks users exist
        let exist1 = await userService.getUser(req.body.username)
        let exist2 = await userService.getUser(decoded.username)
        if (!exist1 || !exist2) {
            return res.status(400).send("Bad request");
        }
        // checks if users have a chat
        let isFound = await chatService.findByTwoUsers(decoded.username, req.body.username)
        if (isFound)
            return res.status(409).send("Chat already exists");
        // adds chat
        await chatService.createByUsername(decoded.username, req.body.username)
        otherUser = req.body.username
        // sends the chat was added to the socket of the other user
        if (io.in(otherUser) != null)
            io.in(otherUser).emit('usernameAdd', { sender: decoded.username, receiver: otherUser })
        // sends in firebase
        let otherToken = await userService.getUserWithToken(otherUser)
        if (otherToken != null)
            firebaseService.addContact(otherUser, otherToken.token)
       
        return res.status(200).send("User added")
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
}

//Returns chat by id given
const getChatById = async (req, res) => {
    try {
        // verifing a user
        if (!req.headers.authorization) {
            return res.status(400).send("Bad request")
        }
        let aut = req.headers.authorization
        const words = aut.split(' ')
        const token = words[1]
        jwt.verify(token, 'hemi-hemi-is-never-gonna-give-you-up')
    } catch (error) {
        return res.status(401).send("Unable to authenticate")
    }
    // checks for params
    const id = req.params.id
    if (!req.params.id) {
        return res.status(400).send("Invalid request parameters")
    }
    try {
        // gets the chat
        const existingChat = await chatService.getChatById(id)
        if (!existingChat) {
            return res.status(404).send("Chat not found")
        }
        return res.status(200).send(existingChat)
    } catch (error) {
        return res.status(500).send("Internal Server Error")
    }
}

// delets chat and its info by id
const deleteChatById = async (req, res) => {
    let username
    try {
        // verifing a user
        if (!req.headers.authorization) {
            return res.status(400).send("Bad request")
        }
        let aut = req.headers.authorization
        const words = aut.split(' ')
        const token = words[1]
        username = jwt.verify(token, 'hemi-hemi-is-never-gonna-give-you-up').username
    } catch (error) {
        return res.status(401).send("Unable to authenticate")
    }
    // checks params
    const id = req.params.id
    if (!req.params.id) {
        return res.status(400).send("Invalid request parameters")
    }
    try {
        // returs 404 if chat not found
        let chat = await chatService.getChatById(id)
        if (!chat) {
            return res.status(404).send("Chat not found")
        }
        chatService.deleteChatById(chat, id)
        let otherUser = chatService.findOtherUser(username, chat)
        // sends the chat was deleted to the socket of the other user
        if (io.in(otherUser) != null)
            io.in(otherUser).emit('idDel', id) 
        // sends in firebase
        let otherToken = await userService.getUserWithToken(otherUser)
        if (otherToken != null)
            firebaseService.removeContact(otherUser, otherToken.token)
        return res.status(200).send("Chat successfully deleted")
    } catch (error) {
        return res.status(500).send("Internal Server Error")
    }
}

// sends a message by chat id
const postChatMessagesById = async (req, res) => {
    let username
    try {
        // verifing a user
        if (!req.headers.authorization) {
            return res.status(400).send("Bad request")
        }
        let aut = req.headers.authorization
        const words = aut.split(' ')
        const token = words[1]
        username = jwt.verify(token, 'hemi-hemi-is-never-gonna-give-you-up').username
    } catch (error) {
        return res.status(401).send("Unable to authenticate")
    }
    // checks params
    const id = req.params.id
    if (!req.params.id) {
        return res.status(400).send("Invalid request parameters")
    }
    try {
        const existingChat = await chatService.getChatById(id)
        if (!existingChat) {
            return res.status(404).send("Chat not found")
        }
        let newMessage = req.body.msg
        if (!newMessage)
            return res.status(400).send("Invalid request parameters")
        // sends the message
        const messages = await chatService.postChatMessagesById(id, newMessage, username)
        // sends the message to the socket of the other user
        let otherUser = chatService.findOtherUser(username, existingChat)
        if (io.in(otherUser) != null)
            io.in(otherUser).emit('idmsg', id)
        let otherToken = await userService.getUserWithToken(otherUser)
        // sends in firebase
        if (otherToken != null)
            firebaseService.sendMessage(req.body.msg, username, otherToken.token)
        return res.status(200).send(messages)
    } catch (error) {
        return res.status(500).send("Internal Server Error")
    }
}

// get chat by id
const getChatMessagesById = async (req, res) => {
    try {
        // verifing a user
        if (!req.headers.authorization) {
            return res.status(400).send("Bad request")
        }
        let aut = req.headers.authorization
        const words = aut.split(' ')
        const token = words[1]
        jwt.verify(token, 'hemi-hemi-is-never-gonna-give-you-up')
    } catch (error) {
        return res.status(401).send("Unable to authenticate")
    }
    // checks params
    const id = req.params.id
    if (!req.params.id) {
        return res.status(400).send("Invalid request parameters")
    }
    try {
        // gets chat
        const existingChat = await chatService.getChatById(id)
        if (!existingChat) {
            return res.status(404).send("Chat not found")
        }
        // gets messages
        const messages = await chatService.getChatMessagesById(id)
        return res.status(200).send(messages)
    } catch (error) {
        return res.status(500).send("Internal Server Error")
    }
}
const getIo = (IO) => {
    io = IO
}

module.exports = { getIo, getChats, postChat, getChatById, deleteChatById, postChatMessagesById, getChatMessagesById } 