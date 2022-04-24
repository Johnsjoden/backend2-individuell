const express = require("express")
const User = require("../modules/user")
const router = express.Router()

router.use((req, res, next) => {
    next()
})
router.post("/user", async (req, res) => {
    const {username, password} = req.body
    const user = new User({username, password})
    await user.save(function(err, user){
        if(err){
            if(err._message === 'User validation failed'){
              res.json({error: "4 letters at least on username and password"})  
            }else {
                res.json({error: "username already taken"})
            }
         }else {
             res.send({user: user.username})
         } 
    })
})
module.exports = router 