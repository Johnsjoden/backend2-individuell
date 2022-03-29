const express = require("express")
const verify = require("../components/verify")
const {Todo, getFinishTodo} = require("../modules/todo")
const router = express()
const {getTodo} = require("../modules/todo")

router.get("/todo", verify, async (req, res ) => {
    const result = await getTodo(req.user.userId)
    res.json(result)  
})
router.post("/todo", verify, async (req, res ) => {
    const data = req.body
    if([Object.keys(data).length] == 1){ 
        const content = {
            content: data[Object.keys(data)[0]],
            userId: req.user.userId
        }
        const todo = await new Todo(content)
        todo.save()
        res.json(todo)
    }else {
        res.sendStatus(400)
    }
    
})
router.get("/todo/finish", verify, async (req, res ) => {
    const result = await getFinishTodo(req.user.userId)
    res.json(result)
})

module.exports = router