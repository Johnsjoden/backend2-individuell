require('dotenv').config()
const express = require("express")
const user = require("./routes/user")
const token = require("./routes/token")
const todo = require("./routes/todo")
const authorization = require("./routes/authorization")
const cors = require("cors")
const mongoose = require("mongoose")
const {Server} = require("socket.io")
const http = require("http")
const {Todo} = require("./modules/todo")

const app = express()
const server = http.createServer(app)

const PORT = process.env.PORT

const io = new Server((server), {
    cors: {
        origin: "http://localhost:3000"
    }
})
io.on("connection", socket => {
    console.log("user connected")
    socket.on("disconnect", message => {
        console.log("user disconnect")
    })
    socket.on("click", async (subject) => {
        const {id, done} = subject
        if(done === false){
            const result = await Todo.findByIdAndUpdate({_id: id}, {done: true})
        }else {
            const result = await Todo.findByIdAndUpdate({_id: id}, {done: false})
        }
    })
})
mongoose.connect("mongodb://localhost:27017/inviduell")
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(authorization)
app.use("/api", todo)
app.use("/api",user)
app.use("/api",token) 

server.listen(PORT, () => {
    console.log("server started on", PORT)
})
module.exports = server