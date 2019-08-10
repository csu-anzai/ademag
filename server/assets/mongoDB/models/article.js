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
    in:[]
})

module.exports = mongoose.model('Article', articleSchema)