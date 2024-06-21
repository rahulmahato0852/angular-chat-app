const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')


exports.userPortected = asyncHandler(async (req, res, next) => {

    const { chatUser } = req.cookies
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