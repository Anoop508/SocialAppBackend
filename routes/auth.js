const User = require('../models/User')
const Router = require('express').Router();
const bcrypt = require('bcrypt');

// User Registration
Router.post('/register', async (req, resp) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(req.body.password, salt)
        const newUser = new User({
            username: req.body.username,
            emailID: req.body.emailID,
            mobile: req.body.mobile,
            gender: req.body.gender,
            password: hashpassword
        })
        await newUser.save()
        resp.status(200).json(newUser)
    } catch (err) {
        console.log(err)
        resp.status(500).json(err)
    }
})

// Login API

Router.post('/login', async (req, resp) => {
    try {
        const user = await User.findOne({ emailID: req.body.emailID })
        !user && resp.status(200).json({ status: false, mesage: 'user not found' })

        if (user) {
            const vaildpassword = await bcrypt.compare(req.body.password, user.password)
            vaildpassword ?
                resp.status(200).json({ status: true, message:'user login successfully', data: user }) :
                resp.status(200).json({ status: false, message: 'Wrong password' })
        }

    } catch (err) {
        resp.send(err)
    }
})

module.exports = Router