const asyncHandler = require('express-async-handler')
const User = require('../models/User')

exports.getAllUsers = asyncHandler(async (req, res) => {
    const result = await User.find()
    res.status(200).json({ message: "User Fetch success", result })
})




