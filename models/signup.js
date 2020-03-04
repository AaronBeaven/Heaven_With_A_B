const mongoose = require('mongoose') // requiring mongoose 

const UserSchema= new mongoose.Schema({
    name:{type:String , required: true}, //making sure the data ehich ios imputted is a string 
    email:{type:String , required:true},
    password:{type:String, required:true}
});

module.exports=mongoose.model('users', UserSchema) //used so we can export the form 