require('dotenv').config()
const express = require("express")
const user = require("./routes/user")
const token = require("./routes/token")
const todo = require("./routes/todo")
const authorization = require("./routes/authorization")
const mongoose = require("mongoose")

const PORT = process.env.PORT

const app = express()
mongoose.connect("mongodb://localhost:27017/inviduell")
app.use(express.json())
/* app.use(verify) */
app.use(authorization)
app.use("/todo", todo)
app.use(user)
app.use(token)

app.listen(PORT, () => {
    console.log("server started on", PORT)
})