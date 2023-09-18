const jwt = require('jsonwebtoken')
const secret= process.env.JWT_SECRET_KEY

const generateToken=(user)=>{
    const {_id,username,mail,premium}=user
    return jwt.sign({
        _id,
        username,
        mail,
        premium
    },secret,{
        expiresIn:'1d'
    })
}

module.exports = generateToken
