const asyncHandler = require('express-async-handler')
const Chat = require('../models/Chat')
const Message = require('../models/Message')
const { io } = require('../socket/socket')


exports.sendMessage = asyncHandler(async (req, res) => {

    const { message, recevier, userId } = req.body

    const result = await Chat.findOne({
        $and: [
            { users: userId },
            { users: recevier },
        ]
    })
    if (result) {
        await Message.create({ message, chat: result._id, sender: userId })
        console.log("send succes");
    } else {
        const x = await Chat.create({ users: [userId, recevier] })
        await Message.create({ message, chat: x._id, sender: userId })
        console.log("new created chat");
    }
    io.to(userId).emit("send-response", userId)
    io.to(recevier).emit("send-response", userId)
    res.status(200).json({ message: "Message Send Success" })
})

exports.getMessages = asyncHandler(async (req, res) => {
    const { userId } = req.body
    const { recevier } = req.params

    const result = await Chat.findOne({
        $and: [
            { users: userId },
            { users: recevier },
        ]
    })
    let messages = []
    if (result) {
        messages = await Message.find({ chat: result._id }).populate("sender")
    }
    res.status(200).json({ message: "Message fetch success", result: messages })
})


