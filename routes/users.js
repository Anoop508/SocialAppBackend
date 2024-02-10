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
          User.findByIdAndDelete({ _id: req.params.id }).then(()=>{
            resp.send(200).json({status:true, measage:'user deleted successfully'})
          });
        } else {
            resp.status(200).json({ status: false, message: 'User Not found' })
        }

    }catch(err) {
            resp.status(500).json({status:false, message:'please provide vaild id', errr:err})
        }
        
    })

    router.get('/get', (req, resp)=>{
        User.find().then((users)=>{
            resp.status(200).json({status:true, message:"User list", data:users})
        }).catch((err)=>{
            resp.status(500).json(err)
        })
    })

    router.get('/getUserByID/:id' , async(req, resp)=>{
            try{
                const user = await User.findOne({_id : req.params.id})
                user && 
                resp.status(200).json({status:true,message:'user fetched successfully', userdetails:user})

                !user &&
                resp.status(200).json({status:false, message:"user not found"})

            }catch(err){
                resp.status(500).json({status:false, message:'please provide vaild Id', err:err})
            }

        // User.findById({_id: req.params.id}).then((user)=>{
        //     resp.status(200).json({status: true, mesage:"User fetched successfully", userdetails:user})
        // }).catch((err)=>{
        //     resp.status(500).json({status:false, message:'User is not Found', err:err})
        // })
    })

module.exports = router;