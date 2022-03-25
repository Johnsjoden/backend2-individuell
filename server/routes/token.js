
const express = require('express')
const router = express.Router()
const User = require("../modules/user")
const JWT = require("jsonwebtoken")

const JWT_SECRET = process.env.JWT_SECRET

router.post('/token', async (req, res) => {
    const {username, password} = req.body
    const user = await User.login(username, password, res)
    if(user){
      const userId = user._id.toString()
      console.log(userId)
      const token = JWT.sign(
        {userId, username: user.username},
        JWT.SECRET, 
        {expiresIn: "30 days", subject: userId}
      )
      res.send({token, userId})
    }
})

module.exports = router