const router = require('express').Router()
const User = require('../models/User')
const Post = require('../models/Post')
const Comment = require('../models/Comment')

// add comment

router.post('/addComment', (req, resp) => {
    try {

        let comment = new Comment({
            comment: req.body.comment,
            userId: req.body.userId,
            username: req.body.username,
            postId: req.body.postId
        })

        comment.save().then((response) => {

            Post.updateOne({_id:req.body.postId},{$push:{comments:response._id}}).then((response)=>{
                resp.status(200).json({ status: true, message: 'Comment added successfully', Response: response})
            }).catch((err)=>{
                   resp.status(200).json({status:false, message:"Something went wrong1", Error:err}) 
            })
        }).catch((err) => {
            resp.status(200).json({ status: false, message: 'Something went wrong2', Error: err })
        })


    } catch (err) {
        resp.status(500).json({ Error: err })
    }
})

//delete comment

router.delete('/deleteComment/:id', async (req, resp) => {
    try {

        const comment = await Comment.findOne({ _id: req.params.id })
        if (comment) {
            Comment.deleteOne({ _id: req.params.id }).then((response1) => {
                Post.updateOne({_id:comment.postId},{$pull:{comments:comment._id}}).then((response, response1)=>{
                    resp.status(200).json({ status: true, message: 'Comments Deleted Successfully', Response: response1 })
                })
                
            }).catch((err) => {
                resp.status(200).json({ status: false, message: "Something went wrong", Error: err })
            })
        } else {
            resp.status(200).json({ status: false, message: "Comment not found" })
        }

    } catch (err) {
        resp.status(500).json({ Error: err })
    }
})

//get comment by post id

router.get('/getComment/:postId', async(req, resp)=>{
    try{
        
        const commentList = await Comment.find({postId:req.params.postId})
       
        if(commentList.length>0){
            resp.status(200).json({status:true, message:'comment fetched successfully corresponding Post', Response:commentList})
        }else{
            resp.status(200).json({status:false, message:'No comment found on corssponding Post'})
        }


    }catch(err){
        resp.status(500).json({Error:err})
    }
})



//udpate comment

router.put('/updatedComment/:id', async (req, resp)=>{
    try{
        let comment = await Comment.findOne({_id:req.params.id})
        if(comment){
            Comment.updateOne({_id:req.params.id},{$set:{comment:req.body.comment}}).then((response)=>{
                resp.status(200).json({status:true, message:"Comments updated successfully", Response:response})
            }).catch((err)=>{
                resp.status(200).json({status:false,message:'Something went wrong', Error:err})
            })
        }else{
            resp.status(200).json({status:true, message:"may be comment Id is wrong"})
        }
    }catch(err){
        resp.status(500).json({Error:err})
    }
})




module.exports = router