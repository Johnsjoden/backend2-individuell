const server = require("../index")
const {Server} = require("socket.io")

const io = new Server((server), {
    cors: {
        origin: "http://localhost:9000"
    }
})
io.on("connection", socket => {
    console.log("user connected")
    socket.on("disconnect", message => {
        console.log("user disconnect")
    })
    socket.on("click", subject => {
    })
})