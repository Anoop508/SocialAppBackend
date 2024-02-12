const express = require('express');
const app = express();

const morgan = require('morgan');
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const helmet = require('helmet')
dotenv.config()
const userRoutes = require('./routes/users')
const AuthRoutes = require('./routes/auth')
const PostRoutes = require('./routes/post')
const CommentRoutes = require('./routes/comment')



app.use(express.json())

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("MongoDB Connected")
}).catch(()=>{
    console.log("Something went wrong with mongo DB Connection")
})

app.use('/socialapp/api/users',userRoutes)
app.use('/socialapp/api/auth',AuthRoutes)
app.use('/socialapp/api/post',PostRoutes)
app.use('/socialapp/api/comment',CommentRoutes);
app.use('/uploads',express.static('uploads'))
app.use(helmet())
app.use(morgan("common"))
app.listen(8200, ()=>{
    console.log("App is running 8200")
})