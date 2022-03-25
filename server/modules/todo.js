const mongoose = require("mongoose")

const todoSchema = mongoose.Schema({
    content: {type: String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId},
    date: Date.now()
})

const Todo = mongoose.model("Todo", todoSchema)

module.exports = Todo