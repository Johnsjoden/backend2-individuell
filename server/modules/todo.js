const mongoose = require("mongoose")
const User = require("./user")
const todoSchema = mongoose.Schema({
    content: {type: String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    date: {type: Date, default: Date.now},
    done: {type: Boolean, default: false},
    files:[String]
})

const Todo = mongoose.model("Todo", todoSchema)

const getTodo = async (id, query) => {
    let {date, content, search} = query
    search = search.replace(/ /g, "|")
    if(content){
        return await Todo.find({userId: id, done: false, content: {$regex: new RegExp(`\\b${search}\\b`, "gi")}}).populate("userId", "username, -_id").sort({content: content})
    }
    return await Todo.find({userId: id, done: false, content: {$regex: new RegExp(`\\b${search}\\b`, "gi")}}).populate("userId", "username, -_id").sort({date: date})
    
    
    
}
const getSpecificTodo = async (id) => {
    console.log(id)
    return await Todo.findOne({_id: id}) 
}
const updateTodo = async (req) => {
    let userInfo = {

    }
    if(req.body[0] !== undefined){
        userInfo.body = req.body
    }else if (req.files !== undefined){
        let files = []
        req.files.forEach( async item => {
        files.push("http://localhost:9000/" + item.filename)
        })
        userInfo.files = files
    }
    console.log(userInfo)
    return await Todo.findByIdAndUpdate({_id: req.params.id}, userInfo, {new: true})
}
const getFinishTodo = async (id, query) => {
    let {date, content, search} = query
    search = search.replace(/ /g, "|")
    if(content){
        return await Todo.find({userId: id, done: true, content: {$regex: new RegExp(`\\b${search}\\b`, "gi")}}).populate("userId", "username, -_id").sort({content: content})
    }
    return await Todo.find({userId: id, done: true, content: {$regex: new RegExp(`\\b${search}\\b`, "gi")}}).populate("userId", "username, -_id").sort({date: date})
}

module.exports = {Todo, getTodo, getFinishTodo, getSpecificTodo, updateTodo}