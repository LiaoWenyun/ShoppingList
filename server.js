const express= require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors=require('cors');
const bodyParser= require('body-parser');
const passport = require('passport');
const customers=require('./Routes/customers');
const shoppinglist=require('./Routes/shoppinglist');
const userprofile=require('./Routes/userprofile');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost/Store',(err)=>{
    if(err){
        console.log('Error: The database is not connected.')
    }else{ 
        console.log('The database is connected...')
    }
})



app.use('/customers',customers);
app.use('/shoppinglist',shoppinglist);
app.use('/userprofile',userprofile);

app.use(passport.initialize());
app.use(passport.session());
require('./passport/passport')(passport);



app.listen(8000,(err)=>{
    if(err){
        console.log('The server is crushed.')
    }else{
        console.log("The server is running......")
    }
})

