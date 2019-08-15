const mongoose = require('mongoose')

let Schema = mongoose.Schema;

let articleSchema = new Schema({
    title:{
        type:String,
        required:[true, 'the params title is necessary']
    },
    status:{
        type:Boolean,
        default:true
    },
    in:{
        type:Array,
        default:[]
    },
    doc:{
        type:Object,
        default:{void:true}
    }
})

module.exports = mongoose.model('Article', articleSchema)