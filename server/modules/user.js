const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const userSchema = mongoose.Schema({
    username: {type: String, unique: true, required: true, minlength: 4},
    password: {type: String, required: true, minlength: 4}
})

userSchema.pre(
    "save",
    async function(next){
        
        let user = this
        const hash = await bcrypt.hash(user.password, 10)
        user.password = hash
        next()
    }
) 

userSchema.statics.login = async function(username, password, res, next){
        const user = await User.findOne({username})
        if(user && bcrypt.compare(user.password, password)){
            return user
        }
        res.sendStatus(401)
    }
const User = mongoose.model("User", userSchema)

 
module.exports = User