const monggose = require('mongoose')

const messageSchema = new monggose.Schema({

    sender: { type: monggose.Types.ObjectId, ref: "user" }, //1
    chat: { type: monggose.Types.ObjectId, ref: "chat" },
    message: String,
})






module.exports = monggose.model("message", messageSchema)