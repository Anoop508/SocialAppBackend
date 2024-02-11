const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    caption:{
        type:String,
        max:200
    },
    userId: {
        type:String,
        required:true
    },
    username:{
        type: String,
        max:200,
        required:true
    },
    imageUrl:{
        type:String,
    },
    likes:{
        type:Array,
        default:[]
    },
    comments:{
        type:Array,
        default:[]
    }
},{timestamps:true})

module.exports = new mongoose.model("Post", PostSchema)