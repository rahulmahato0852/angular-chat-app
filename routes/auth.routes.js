const { registerUser, loginUser, verifyOtp, logOutUser } = require('../controllers/auth.controller')

const router = require('express').Router()


router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/verify-otp", verifyOtp)
router.post("/logOut", logOutUser)



module.exports = router

