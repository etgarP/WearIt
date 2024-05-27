const User = require('../models/Users').User
const userService = require('../services/Users')
const Chat = require('../models/Chats').Chat
const Message = require('../models/Chats').Message
const Counter = require('../models/Chats').Counter

// gets an id and searches for a chat
const getChatById = async (id) => {
    try {
        const chat = await Chat.findOne({ "id": id }).populate('users').exec()
        return chat
    } catch (error) {
        throw error
    }
};

const findOtherUser = (username, chat) => {
    otherUser = chat.users.find(user => user.username != username)
    otherUsername = otherUser.username
    return otherUsername
}

// checks if users have a chat
const findByTwoUsers = async (user1, user2) => {
    try {
        const chats = await getUserChats(user1)
        if (!chats) return false
        // checks all the chats for the other person
        for (const chat of chats) {
            if (chat.user.username === user2) return true
        }
        return false
    } catch (error) {
        throw error
    }
}

// creates a new counter for a chat and returns its id
const createCounter = async () => {
    try {
        // gets the last counter
        const lastEntry = await Counter.findOne().sort({ _id: -1 }).exec();
        let id = (lastEntry ? lastEntry.id : 0) + 1
        // makes a new counter with a higher id
        const counter = new Counter({
            id: id,
            messageCount: 0
        })
        await counter.save()
        return id
    } catch {
        throw error
    }
}

// creates a chat and a matching counter for it
const createByUsername = async (myUser, otherUser) => {
    try {
        let id = await createCounter()
        const chat = await new Chat({
            id: id,
            users: [await userService.getUser(myUser), await userService.getUser(otherUser)],
            messages: []
        })
        await chat.save()
        id++
        return
    } catch (error) {
        throw error
    }
}

// gets messages by chat id
const getChatMessagesById = async (id) => {
    try {
        // sends the chats with all of its fields populated with the models
        const chat = await Chat.findOne({ id }).populate({ path: 'messages', model: 'Message', populate: { path: 'sender', model: 'User' } }).lean().exec();
        return chat.messages.reverse()
    } catch (error) {
        throw error
    }
}

//add one to the counter
const addToCounter = async (id) => {
    try {
        const counter = await Counter.findOne({ id }).exec();
        const updatedCount = counter.messageCount + 1;
        await Counter.findOneAndUpdate({ id }, { messageCount: updatedCount });
        return updatedCount;
    } catch (error) {
        throw error;
    }
}

// adds a new message to the chat
const postChatMessagesById = async (id, content, username) => {
    try {
        // adds to counter gets user, gets new message, pushes the message and saves
        let messageCount = await addToCounter(id)
        const user = await userService.getUser(username)
        let newMessage = await getNewMessage(messageCount, user, content)
        const chat = await Chat.findOne({ id });
        chat.messages.push(newMessage);
        await chat.save();
        return
    } catch (error) {
        throw error
    }
}

// gets a new message
const getNewMessage = async (id, sender, content) => {
    try {
        const newMessage = new Message({
            id: id,
            sender: sender,
            content: content
        });
        await newMessage.save()
        return newMessage
    } catch (error) {
        throw error
    }
}

// delets the chat and its messages and counter
const deleteChatById = async (chat, id) => {
    try {
        // deletes its messages
        chat.messages.forEach(async message => {
            let messageModel = await Message.findOne(message)
            await Message.deleteOne(messageModel)
        });
        // deletes the counter and the chat
        let counter = await Counter.findOne({ id: chat.id })
        await Counter.deleteOne(counter)
        await Chat.deleteOne(chat)
        return true
    } catch (error) {
        throw error
    }
};

// gets a username and for every chat the user has it returns
// a json object with the chat id the other user and the last message
const getUserChats = async (username) => {
    try {
        //finds all the chats that user is in
        const user = await User.findOne({ username });
        const chats = await Chat.find({ users: user._id }).populate('users').populate({ path: 'messages', model: 'Message' });
        const transformedChats = [];
        // created the json objects and adds it and sends it
        chats.forEach((chat) => {
            const otherUser = chat.users.find((user) => user.username !== username)
            if (otherUser != null) {
                let messages = chat.messages
                const keys = Object.keys(messages);
                const lastKey = keys[keys.length - 1];
                const lastMessage = messages[lastKey];
                transformedChats.push({
                    id: chat.id,
                    user: otherUser,
                    lastMessage: lastMessage
                });
            }
        });
        return transformedChats;
    } catch (error) {
        throw error;
    }
};

module.exports = { findOtherUser, getChatById, deleteChatById, getUserChats, getChatMessagesById, postChatMessagesById, createByUsername, findByTwoUsers, getNewMessage }