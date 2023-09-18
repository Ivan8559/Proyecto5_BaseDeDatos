require('dotenv').config()
const {expressjwt}=require('express-jwt')
const secret=process.env.JWT_SECRET_KEY

const getToken=(req)=>{
    const{authorization}=req.headers
    console.log(authorization)
    if(authorization){
        const[type,token]=authorization.split(' ')
        return (type==='Token'||type==='Bearer')?token:null
    }
    return null
}

const auth = expressjwt({
    secret,
    algorithms:['HS256'],
    userProperty:'user',
    getToken
})

module.exports = auth