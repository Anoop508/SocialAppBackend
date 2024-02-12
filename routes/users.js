const User = require('../models/User');
const bcrypt = require('bcrypt')

const router = require('express').Router();

router.put('/update/:id', async (req, resp) => {
    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        User.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }).then(() => {
            resp.status(200).json({ status: true, message: 'User Updated Successfully' })
        }).catch((err) => {
            resp.status(500).json(err)
        })

    } catch (err) {
        resp.status(500).json(err)
    }
})


router.delete('/delete/:id', async (req, resp) => {
    try {
        const user = await User.findOne({ _id: req.params.id })
        if (user) {
            User.findByIdAndDelete({ _id: req.params.id }).then(() => {
                resp.send(200).json({ status: true, measage: 'user deleted successfully' })
            });
        } else {
            resp.status(200).json({ status: false, message: 'User Not found' })
        }

    } catch (err) {
        resp.status(500).json({ status: false, message: 'please provide vaild id', errr: err })
    }

})

router.get('/get', (req, resp) => {
    User.find().then((users) => {
        resp.status(200).json({ status: true, message: "Users fetched successfully", data: users })
    }).catch((err) => {
        resp.status(500).json(err)
    })
})

router.get('/getUserByID/:id', async (req, resp) => {
    try {
        const user = await User.findOne({ _id: req.params.id })
        user &&
            resp.status(200).json({ status: true, message: 'user fetched successfully', userdetails: user })

        !user &&
            resp.status(200).json({ status: false, message: "user not found" })

    } catch (err) {
        resp.status(500).json({ status: false, message: 'please provide vaild Id', err: err })
    }

    // User.findById({_id: req.params.id}).then((user)=>{
    //     resp.status(200).json({status: true, mesage:"User fetched successfully", userdetails:user})
    // }).catch((err)=>{
    //     resp.status(500).json({status:false, message:'User is not Found', err:err})
    // })
})


//follow

router.put('/follow/:id', async (req, resp) => {
    try {
        const user = await User.findOne({ _id: req.params.id })
        const currentuser = await User.findOne({ _id: req.body.userId })

        let isfollowed = false;

        user.followers.map((item) => {
            // console.log(req.body.userId)
            // console.log(item)
            if (item === req.body.userId) {
                isfollowed = true
            }
        })
        if (isfollowed) {
            // resp.status(200).json({ status: false, message: "You are already followed current user" })
            const res1 = await User.updateOne({ _id: req.body.userId }, { $pull: { following: req.params.id } })
            const res2 = await User.updateOne({ _id: req.params.id }, { $pull: { followers: req.body.userId } })
            resp.status(200).json({status:true, message:"User unfollow successfully"})
            
        } else {
            const res1 = await User.updateOne({ _id: req.body.userId }, { $push: { following: req.params.id } })
            const res2 = await User.updateOne({ _id: req.params.id }, { $push: { followers: req.body.userId } })
            resp.status(200).json({ status: true, message: "Follwed user Successfully" })
        }

    } catch (err) {
        resp.status(500).json(err)
    }
})


//unfollow

router.put('/unfollow/:id', async (req, resp) => {
    try {
        const user = await User.findOne({ _id: req.params.id })
        const currentuser = await User.findOne({ _id: req.body.userId })

        // console.log(user)

        let isfollowed = false;

        user.followers.map((item) => {
            if (item === req.body.userId) {
                isfollowed = true
            }
        })

        if (!isfollowed) {
            resp.status(200).json({ status: false, message: "You are not followed current user" })
        } else {
            const res1 = await User.updateOne({ _id: req.body.userId }, { $pull: { following: req.params.id } })
            const res2 = await User.updateOne({ _id: req.params.id }, { $pull: { followers: req.body.userId } })
            resp.status(200).json({ status: true, message: "Unfollowed user Successfully" })
        }

    } catch (err) {
        resp.status(500).json({Error:err})
    }
})

module.exports = router;