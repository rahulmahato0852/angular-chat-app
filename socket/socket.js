const express = require("express")
const http = require("http")
const { Server } = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: "https://angular-chat-oabq9asre-rahul-mehatas-projects.vercel.app" } })

let ONLINE_USERS = []
io.on("connection", socket => {

    socket.on("join-app", (user) => {
        socket.join(user._id);
        ONLINE_USERS.push({ sid: socket.id, uid: user._id });
        io.emit("Online-res", ONLINE_USERS);
    })

    socket.on("disconnect", (data) => {
        ONLINE_USERS = ONLINE_USERS.filter(item => item.sid !== socket.id);
        io.emit("Online-res", ONLINE_USERS);
    })



})

module.exports = { app, server, io }