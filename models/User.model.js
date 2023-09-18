const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        validate: {
            validator:function(v){
                return /^[a-zA-Z0-9 ]{3,30}$/.test(v)
            },
        }
    },
    password: {
        type: String,
        required: true,
    },
    mail: {
        type: String,
        required: true,
        unique: true,
        index: true,
        validate: {
            validator:function(v){
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v)
            },
        }
    },
    phone: {
        type: Number,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    rol: {
        type: String,
        required: false,
    },
    premium: {
        type: Boolean,
        required: true,
        default: false
    },
    dob: {
        type: Date,
        required: false,
    },

},{
    timestamps:true

})


const User = mongoose.model('User',UserSchema)

module.exports= User