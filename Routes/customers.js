const express =require('express');
const router =express.Router();
const passport = require('passport');
const jwt=require('jsonwebtoken');
const Customer= require('../Models/Customer');
const cors=require('cors');


router.post('/signup',(req,res,err)=>{
    let new_Customer=
    new Customer({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        email:req.body.email,
        
    })


    Customer.customer_exists(new_Customer, (err, customer)=>{
        if(err){
            res.json({msg:'sign up failed >.<' });
        }
        if(!customer){

        Customer.save_customer(new_Customer).then((success)=>{
       
            res.json({success : true, msg:'customer is saved !'});
            console.log("user saved!");
        },(fail)=>{
            res.json({success :false, msg: 'customer is not saved !'});
            console.log('user is not saved!');
        })

        }else{
            res.json({success :false,msg:' user exists ' })
        }
    })
})



router.post('/login',cors(),(req,res,next)=>{
    let my_username=req.body.username;
    let my_password=req.body.password;
    

    Customer.username_get_customer(my_username,(err,customer)=>{
        if(err){
            res.json({err:"err: cannot get the user."})
        }
        if(!customer){
            res.json({success:false,
                msg:"user is not signed up!"})
        }
        else{
            Customer.customer_match_password(my_password,customer.password,(err,match)=>{
                if(err){
                    throw err;
                }
                if(match){
                    const secret = 'dshfgksjfhkldsdkjasbsjh87wndbasnhe7'
                    const token =jwt.sign({data : customer}, secret);
                    res.json({
                        success: true,
                        token: 'JWT '+token,
                        customer: {
                            id: customer._id,
                            name: customer.name,
                            username: customer.username,
                            email: customer.email,
                            item: customer.item,
                            accountShare: customer.accountShare,
                            shareWith: customer.shareWith
                          }
                      });
                    console.log("password match")
                }
                else{
                    console.log("password not match")
                    res.json({success: false,
                    msg:"password does not match"}); // needs to be in json, for the client side to subscribe
                }
            })
        }  
    })  
})


module.exports=router;