
exports.auth = function (){
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
}}