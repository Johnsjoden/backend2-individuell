const express = require("express")
const User = require("../modules/user")
const router = express.Router()

router.use((req, res, next) => {
    next()
})
router.post("/user", async (req, res) => {
    const {username, password} = req.body
    const user = new User({username, password})
    await user.save()
    res.json(user)
})
module.exports = router