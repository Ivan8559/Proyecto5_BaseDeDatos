const mongoose = require('mongoose')
const generateToken = require('../helpers/generateToken') // nuevo contenido obtener contraseña
const hashPassword = require('../helpers/hashPassword') // 2 nuevo contenido encriptar contraseña

const User = mongoose.model('User')


const signup = async (req,res) => {
    const{username,mail,password}=req.body //nuevo contenido -
    const mailLowerCase=mail.toLowerCase()
    const regexPassword=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if(!regexPassword.test(password)){ // - nuevocontenido
        return res.status(401).json({
            message:"Password must be at least 8 characters long and contain at least one number, one lowercase and one uppercase letter"
        })
    }
    const hashedPassword = hashPassword(password) // 2 nuevo contenido 
    try {
        const user = new User({ //se cambia el (req.body por un objeto) 2 nuevo contenido
            username,
            mail:mailLowerCase,
            password:hashedPassword
        })
        const resp = await user.save()
        console.log(resp)
        const token = generateToken(resp) //nuevo contenido
        return res.status(201).json({
            message: 'User Created',
            token   
            //nuevo contenido (se cambia detail: resp, por token)
        })
    } catch (err) {
        return res.status(500).json({
            message: 'Internal Server Error',
            detail: err,
        })
    }
}

const getUsers = async (req,res) => {
    try{
        const resp = await User.find()
        return res.status(200).json({
            message: 'OK',
            detail: resp,
        })   
    } catch (err) {
        return res.status(500).json({
            message: 'Internal Server Error',
            detail: err,
        })
    }
}

const updateUsers=async (req,res) => {
    const{_id,userUpdated}= req.body
    console.log(_id,userUpdated)
    try {
        const resp= await User.findByIdAndUpdate(_id,userUpdated, {new:true})
        return res.status(200).json({
            message:'ok',
            detail:resp,
        })
    } catch (error) {
        return res.status(500).json({
            message:'Internal Server Error',
            detail:error,
        })
    }
}

const deleteUsers = async (req,res) => {
    const{_id}=req.body
    console.log(_id)
    try {
        const resp = await User.findByIdAndDelete(_id)
        return res.status(200).json({
            message:'ok',
            detail:resp,
        })
    } catch (error) {
        return res.status(500).json({
            message:'Internal Server Error',
            detail:error,
        })
    }
}

const login= async(req,res)=>{
    const{mail,password}=req.body
    const mailLowerCase=mail.toLowerCase()
    const passwordHash=hashPassword(password)

    try {
        const userValidated=await User.findOne({mail:mailLowerCase})
        if(!userValidated){
            return res.status(401).json({
                message:'Usuario no registrado'
            })
        }
        console.log(`${userValidated.password} vs ${passwordHash}`)
        if(userValidated.password===passwordHash){
            console.log('coinciden')
            const token=generateToken(userValidated)
            return res.status(200).json({
                message: 'User logged in successfully',
                userId:userValidated._id,
                token
            })
        }else{
            return res.status(401).json({
                message:'Invalid Password'
            })
    }  
    
    } catch (error) {
        return res.status(500).json({
            message:'Server Error',
            error
        })
    }
}

const getUserById=async(req,res)=>{
    const{_id}=req.params
    try{
        const user=await User.findOne({_id})
        if(user){
            return res.status(200).json({
                message:'ok',
                detail:user
            })
        }
        return res.status(404).json({
            message:'Not found'
        })
    } catch (error) {
        return res.status(500).json({
            message:'Server Error',
            error
        })

    }
}


module.exports = {
    signup,
    getUsers,
    updateUsers, 
    deleteUsers,
    login,
    getUserById
}

//npm install cors
//npm install jsonwebtoken
//npm install express-jwt