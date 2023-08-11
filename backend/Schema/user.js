const mongoose=require('mongoose')
const {Schema,model}=mongoose;
const userSchema= new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,require:true}
})
const user= model('User',userSchema);
module.exports=user;