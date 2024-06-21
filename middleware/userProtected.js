const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')


const userPortected = asyncHandler(async (req, res, next) => {

    const { chatUser } = req.cookies
    console.log(chatUser);
    if (!chatUser) {
        return res.status(401).json({ message: "No cookie found" })
    }
    jwt.verify(chatUser, process.env.JWT_KEY, (err, decode) => {
        if (err) {
            return res.status(401).json({ message: "Session expired" })
        }
        req.body.userId = decode.userId
        req.userId = decode.userId
        next()
    })

})
module.exports = userPortected
