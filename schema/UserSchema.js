const mongoose=require("mongoose")
const validator=require("validator")

const UserSchema=new mongoose.Schema({
   name:{type:String,required:true} ,
   email:{type:String,required:true,
validate:(value)=>validator.isEmail(value)
},
   password:{type:String,required:true},
   cpassword:{type:String,required:true},
   role:{type:String,required:true},
   joinedOn:{type:Date,default:Date.now()},

})

const UserModel=mongoose.model("user",UserSchema)
module.exports={UserModel}