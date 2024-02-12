const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    comment:{
        type:String,
        size:200,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    postId:{
        type:String,
        required:true
    },
},{timestamps:true});

module.exports = new mongoose.model('Comment', CommentSchema)