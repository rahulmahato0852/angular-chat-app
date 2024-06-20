const { registerUser, loginUser, verifyOtp } = require('../controllers/auth.controller')

const router = require('express').Router()


router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/verify-otp", verifyOtp)



module.exports = router

