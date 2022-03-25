
const verify = (req, res , next) => {
    if(req.user){
        console.log("2")
        next()
    }else {
        res.sendStatus(401)
    }
}

module.exports = verify