const express = require("express")
const router = express.Router()
const JWT = require("jsonwebtoken")


router.use( async (req, res, next) => {
    const auth = req.headers.authorization
    if(auth){
        const JWT_SECRET = process.env.JWT_SECRET
        const token = auth.split(" ")[1]
        JWT.verify(token, JWT_SECRET, function(err){
            if(err) {
                res.sendStatus(401)
            }else {
                req.user = JWT.verify(token, JWT_SECRET)
                next()
            }
        })
    }else {
        next()
    }
})

module.exports = router 