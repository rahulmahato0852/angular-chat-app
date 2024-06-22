const monggose = require('mongoose')

const chatSchema = new monggose.Schema({
    name: String,
    users: [
        { type: monggose.Types.ObjectId, ref: "user" }
    ],


},
    {
        timestamps: true
    }
)


module.exports = monggose.model("chat", chatSchema)