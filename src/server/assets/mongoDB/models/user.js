const mongoose = require('mongoose')

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre:{
        type:String,
        required:[true, 'El nombre es necesario']
    },
    email:{
        type:String,
        required:[true, 'El mail es necesario']
    },
    password:{
        type:String,
        required:[true, 'El password es necesario']
    },
    img:{
        type:String,
        required:false
    },
    role:{
        type:String,
        default:'USER_ROLE'
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    },
    plus:[]
})

module.exports = mongoose.model('Usuario', usuarioSchema)