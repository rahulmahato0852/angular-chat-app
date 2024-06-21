const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

require("dotenv").config({ path: "" })



const app = express()

app.use(cors({
    origin: "http://localhost:4200",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())



app.use("/api/v1/auth", require("./routes/auth.routes"))
app.use("/api/v1/user", require("./routes/user.routes"))



app.use(('*', (req, res) => {
    res.status(404).json({ message: "No resource found" })
}))


app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message || "Server Error" })
})


mongoose.connect(process.env.MONGO_URL)

mongoose.connection.once("open", () => {
    console.log("Mongoose connected ");
    app.listen(process.env.PORT, console.log("Server running"))
})

