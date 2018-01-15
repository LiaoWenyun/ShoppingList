const express=require('express');
const router= express.Router();
const passport = require('passport');
const jwt=require('jsonwebtoken');
const Customer=require('../Models/Customer');

router.get('/showProfile',passport.authenticate('jwt', {session:false}),(req,res,next)=>{
    //customer =req.user 
    res.json({customer:req.user});
})


router.post('/resetPassword',passport.authenticate('jwt', {session:false}),(req,res,next)=>{
    customer= req.user 
    Customer.change_password(req.body.password, customer.id,(err)=>{
        if (err){
           res.json({msg:'there is err in changing password'})
        }
            res.json ({msg:'the password is reset'})
        
    })
})


router.post('/resetEmail',passport.authenticate('jwt',{session:false}),(req,res,next)=>{

customer=req.user
Customer.change_email(req.body.email,customer.id,(err)=>{
    if(err){
        res.json({msg:'there is an err in changging email'})
    }
    res.json ({msg:'the email is successfully changged'})

})
})



router.post('/resetUsername',passport.authenticate('jwt', {session:false}),(req,res,next)=>{
    customer=req.user
    Customer.change_username(req.body.username ,customer.id,(err)=>{
        if (err){
            res.json({msg:"cannot reset the username"})
        }
        res.json({msg:"the username is reset"})
    })
})



router.post('/addOtherUser',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
    customer=req.user
    Customer.username_get_customer(req.body.shareWith,(err,other_customer)=>{
        if(err){
            res.json({err:'err msg'})
        }
        if(other_customer){
            Customer.add_other_account(other_customer.username,customer.id,(err)=>{
                if(err){
                   // res.json({err:'can not add other users'})
                }
               // res.json({add:true,msg:'person share with is added'})
              
            })
           // console.log(customer.username)
            Customer.add_accountShare(customer.username,other_customer.id,(err)=>{
                if(err){
                    res.json({err:'err msg to add to accountShare'})
                }
                
                res.json({add:true,msg:'account Shared'})
            })
        
        }else{
            res.json({add:false,msg:'the user you add is not registered'})
        }

    })
    
   
})



module.exports=router;