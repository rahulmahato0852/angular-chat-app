const { getAllUsers } = require('../controllers/user.controller')

const router = require('express').Router()



router
    .get("/all-users", getAllUsers)


module.exports = router
