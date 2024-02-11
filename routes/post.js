const router = require('express').Router()
const Post = require('../models/Post')

//add post

router.post('/addpost', (req, resp) => {
    try {
        const newPost = new Post(req.body)
        newPost.save().then((post) => {
            resp.status(200).json({ message: 'post added successfully', postDetails: post })
        }).catch((err) => {
            resp.status(200).json(err)
        })
    } catch (err) {
        resp.status(500).json(err)
    }
})

//update post

router.put('/update/:id', async (req, resp) => {
    try {
        Post.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }).then((post) => {
            resp.status(200).json({ status: true, message: "Post data Updated Successfully" })
        }).catch((err) => {
            resp.status(200).json({ status: false, message: err })
        })

    } catch (err) {
        resp.status(500).json({ status: false, message: err })
    }
})

//delete post

router.delete('/delete/:id', async (req, resp) => {
    try {
        let post = await Post.findOne({ _id: req.params.id });
        if (post) {
            Post.deleteOne({ _id: req.params.id }).then((response) => {
                resp.status(200).json({ status: true, mesagae: "post is deleted successfully", response: response })
            }).catch((err) => {
                resp.status(200).json({ status: false, mesagae: "Something went wrong", err: err })
            })
        }else{
            resp.status(200).json({status: false, message: "Post Id is not found"})
        }

    } catch (err) {
        resp.status(500).json(err)
    }
})

//get post details by id


//get all posts

//get all posts of any user

module.exports = router