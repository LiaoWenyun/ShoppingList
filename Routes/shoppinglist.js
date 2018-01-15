const express=require('express');
const router= express.Router();
const passport = require('passport');
const jwt=require('jsonwebtoken');
const Customer=require('../Models/Customer')

router.post("/addItem",passport.authenticate('jwt', {session:false}),(req,res)=>{
    cust =req.user    //the req.user is a syntax like req.body
    console.log(req.user)
  //  console.log(JSON.stringifyreq.body.item)
    if(cust.accountShare!=null){
            Customer.username_get_customer(cust.accountShare,(err, the_other)=>{
               if(err){
                console.log('err occure when try to add items and get other customer ')
                }
                if(the_other){
                    console.log(the_other)
                    Customer.store_item(req.body.item,the_other.id,(err)=>{
                        if (err){
                           console.log('err occurs when try to add other users item')
                        }
                        console.log('other users item has been stored too')
                    })
                }
                else{
                    console.log('cannot find custsomer to add items')
                }
            })
    }

    Customer.store_item(req.body.item,cust.id, (err)=>{
        if (err){
            res.json({msg:'cannot store item'})
        }
            Customer.get_customer_by_id(cust.id,(err,customer)=>{
                if(err){
                    res.json({msg:'err at look for customer'})
                }
                if(customer){
                    res.json({item: customer.item})
                }
                else{
                    res.send('please log in again')
                }
            })
        
    })

  //  res.json({username: cust.username,password:cust.password,email: cust.email});
})
router.post('/removeItem',passport.authenticate('jwt',{session:false}),(req,res)=>{
    cust =req.user 
    if(cust.accountShare!=null){
        Customer.username_get_customer(cust.accountShare,(err, the_other)=>{
           if(err){
            console.log('err occure when try to remove items and get other customer ')
            }
            if(the_other){
                console.log(the_other)
                Customer.remove_item(req.body.item,the_other.id,(err)=>{
                    if (err){
                       console.log('err occurs when try to remove other users item')
                    }
                    console.log('other users item has been removed too')
                })
            }
            else{
                console.log('cannot find custsomer to remove items')
            }
          
        })
}
    Customer.remove_item(req.body.item,cust.id,(err)=>{
        if(err){
            res.json({msg:'cannot remove item'})
        }
        Customer.get_customer_by_id(cust.id,(err,customer)=>{
            if(err){
                res.json({msg:'err at look for customer'})
            }
            if(customer){
                res.json({item: customer.item})
            }
            else{
                res.json({msg:'please log in again'})
            }
        })
    })
})



module.exports=router;