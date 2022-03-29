const mongoose = require("mongoose")

const todoSchema = mongoose.Schema({
    content: {type: String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId},
    date: {type: Date, default: Date.now},
    done: {type: Boolean, default: false}
})

const Todo = mongoose.model("Todo", todoSchema)

const getTodo = async (id) => {
    const result = await Todo.find(({userId: id, done: false})).sort({date: -1})
    return result 
} 
const getFinishTodo = async (id) => {
    const result = await Todo.find({userId: id, done: true}).sort({date: -1})
    return result
}

module.exports = {Todo, getTodo, getFinishTodo}