const mongoose = require('mongoose')
const express = require('express')
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userPortected = require('./middleware/userProtected')
const { app, server } = require('./socket/socket')
require("dotenv").config({ path: "" })




app.use(cors({
    origin: "http://localhost:4200",
    credentials: true,
}))
app.use(express.static(path.join(__dirname, "dist")))
app.use(express.json())
app.use(cookieParser())

app.use('/profiles', express.static('profiles'));
app.use('/profiles', express.static('profiles'));


app.use("/api/v1/auth", require("./routes/auth.routes"))
app.use("/api/v1/user", userPortected, require("./routes/user.routes"))
app.use("/api/v1/chat", userPortected, require("./routes/chat.routes"))



app.use(('*', (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "client", "browser", "index.html"))
    // res.status(404).json({ message: "No resource found" })
}))


app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message || "Server Error" })
})


mongoose.connect(process.env.MONGO_URL)

mongoose.connection.once("open", () => {
    console.log("Mongoose connected ");
    server.listen(process.env.PORT, console.log("Server running"))
})

