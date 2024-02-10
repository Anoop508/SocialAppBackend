const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        max: 50,
        required: true
    },
    emailID: {
        type: String,
        max: 50,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        max: 10,
        required: true,
        unique: true
    },
    password: {
        type: String,
        max: 50,
        required: true
    },
    gender: {
        type: String,
        max: 6,
        required: true
    },
    dob:{
        type:String,
        size:50
    },
    address:{
        type:String,
        size:100
    },
    profilepic:{
        type:String,
        default:""
    },
    coverPic:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    }
},{timestamps:true});

module.exports = mongoose.model("User", UserSchema);