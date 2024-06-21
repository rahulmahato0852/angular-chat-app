const asyncHandler = require('express-async-handler')
const User = require('../models/User')

exports.getAllUsers = asyncHandler(async (req, res) => {
    const { userId } = req.body
    const result = await User.find({ _id: { $ne: userId } })
    res.status(200).json({ message: "User Fetch success", result })
})




