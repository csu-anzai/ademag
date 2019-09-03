const mongoose = require('mongoose')

let Schema = mongoose.Schema;

let documentSchema = new Schema({
    title:{
        type:String,
        required:[true, 'the title is necessary']
    },
    description:{
        type:String,
        required:[true, 'the description is necessary']
    },
    status:{
        type:Boolean,
        default:true
    },
    linkUrl:{
        type:String,
        default:''
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

module.exports = mongoose.model('Document', documentSchema)