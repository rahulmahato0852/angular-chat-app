const { sendMessage, getMessages } = require('../controllers/chat.controller')

const router = require('express').Router()



router
    .post("/send-message", sendMessage)
    .get("/get-message/:recevier", getMessages)


module.exports = router
