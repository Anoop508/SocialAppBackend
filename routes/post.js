const router = require('express').Router()
const Post = require('../models/Post')
const User = require("../models/User")
const upload = require("../middleware/upload")

//add post

router.post('/addpost', upload.single("imageUrl") , (req, resp) => {
    try {
        const newPost = new Post(req.body)
        if(req.file){
            newPost.imageUrl=req.file.filename;
        }
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
        } else {
            resp.status(200).json({ status: false, message: "Post Id is not found" })
        }

    } catch (err) {
        resp.status(500).json(err)
    }
})

//get post details by id

router.get('/getPostdetails/:id', async (req, resp) => {
    try {
        let postid = await Post.findOne({ _id: req.params.id })
        if (postid) {

            Post.findOne({ _id: req.params.id }).then((response) => {
                resp.status(200).json({ status: true, message: "Post details fetched Successfully", "Post Details": response })
            }).catch((err) => {
                resp.status(200).json({ status: false, message: "Somethimg went wrong", err: err })
            })

        } else {
            resp.status(200).json({ status: false, message: 'Post ID is not found' })
        }

    } catch (err) {
        resp.status(500).json(err)
    }
})

//get all posts

router.get("/getAllPost", async (req, resp) => {
    try {
        let post = await Post.find();
        if (post) {
            resp.status(200).json({ status: true, mesage: "All post fetched successfully", "Post Collection": post })
        } else {
            resp.status(200).json({ status: false, mesage: "Post does not exist", })
        }
    } catch (err) {
        resp.status(500).json(err)
    }

});

//get all posts of any user

router.get('/getAllPostByuserID/:userId', async (req, resp) => {
    try {

        let userId = await User.findOne({ _id: req.params.userId })

        if (userId) {
            Post.find({ userId: req.params.userId }).then((response) => {
                resp.status(200).json({ status: true, message: "Post fetch Successfully", postDetails: response })
            }).catch((err) => {
                resp.status(200).json({ status: false, message: 'Something went wrong', error: err })
            })

        } else {
            resp.status(200).json({ status: false, message: 'Userid is not correct' })
        }

    } catch (err) {
        resp.status(500).json(err)
    }
})

// like post 
router.put('/like/:id', async (req, resp) => {
    try {
        const post = await Post.findOne({ _id: req.params.id })
        let isliked = false

        post.likes.map((item) => {
            if (item === req.body.userId) {
                isliked = true
            }
        })

        if (isliked) {
            let res1 = await Post.updateOne({ _id: req.params.id }, { $pull: { likes: req.body.userId } })
            resp.status(200).json({ status: true, message: 'Liked removed successfully' })
        } else {
            let res1 = await Post.updateOne({ _id: req.params.id }, { $push: { likes: req.body.userId } })
            resp.status(200).json({ status: true, message: "Liked added successfully " })
        }



    } catch (err) {
        resp.status(500).json({ Error: err })
    }
})



module.exports = router