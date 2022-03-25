const express = require("express")
const verify = require("../components/verify")
const router = express()

router.post("/", verify,(req, res ) => {
    const content = req.body
    res.json(content)
})

module.exports = router