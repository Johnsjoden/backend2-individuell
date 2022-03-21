const express = require("express")

const router = express.Router()

router.get("/token", (req,res ) => {
    console.log("Hello")
})

exports.router = router