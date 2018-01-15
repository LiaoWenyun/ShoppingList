const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const CustomerSchema = mongoose.Schema({
    name:{
        type: String,
        required: false
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    item:{
        type:[String],
        required:false
    },
    accountShare:{
        type:String,
        required: false
    },
    shareWith:{
        type:String,
        required: false
    }

})

let Customer =module.exports =mongoose.model('Customer',CustomerSchema);


module.exports.save_customer=function(new_customer){
 return new Promise(( resolve, reject)=>{

    bcrypt.genSalt(12, (err, salt) =>{
        bcrypt.hash(new_customer.password, salt, (err, hash)=> {
            new_customer.password= hash;
            console.log(new_customer);
            new_customer.save((err)=>{
                if(err){
                    reject(err);
                }
                resolve('');
            });
        });
    });
 })
    

}



module.exports.customer_exists=function(new_customer,callback){
    Customer.findOne({'username': new_customer.username}, callback);

}

module.exports.username_get_customer=function(my_username,callback){
    Customer.findOne({'username': my_username}, callback);

}

module.exports.customer_match_password=function(my_password,hash,callback){
    bcrypt.compare(my_password,hash,(err,match)=>{
    if(err)
        throw err
    callback(null,match);
    })
}

module.exports.get_customer_by_id=function(id,callback){
    Customer.findById(id,callback);
}


module.exports.store_item=function(new_item,userID,callback){
    Customer.findOneAndUpdate({ _id: userID }, { $push: { item: new_item }}, callback);
}

module.exports.remove_item=function(item_to_remove,userID,callback){
    Customer.findOneAndUpdate({_id: userID},{ $pull:{item: item_to_remove}},callback);
}

module.exports.change_password=function(new_password,userID,callback){

    bcrypt.genSalt(12, (err, salt) =>{
        bcrypt.hash(new_password, salt, (err, hash)=> {
             new_password=hash
            Customer.update({_id:userID},{$set:{password: new_password}},callback)
        })
    })
}

module.exports.change_username=function(new_username,userID,callback){
    Customer.update({_id:userID},{$set:{username:new_username}},callback)
}

module.exports.change_email=function(new_email,userID,callback){
    Customer.update({_id:userID},{$set:{email:new_email}},callback)
}


module.exports.add_other_account=function(other_username_to_share,userID,callback){
    Customer.findOneAndUpdate({_id:userID},{$set:{shareWith: other_username_to_share}},callback)
    
}


module.exports.add_accountShare=function(username_to_add, userID,callback){
    Customer.findOneAndUpdate({_id:userID},{$set:{accountShare:username_to_add}},callback)
}



                                                                                                          


//accoutnShare is other people share account with me, i have the right to edit their shoppinglist 
//but Sharewith is i ahre my account with other people, the person i ahre acoount with have the right to edit my list, but i cannnt do theirs


