const monggose = require('mongoose')

const UserSchema = new monggose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    hero: {
        type: String,
        required: true
    },
    otp: {
        type: Number,
    }

}, {
    timestamps: true
})



module.exports = monggose.model("user", UserSchema)