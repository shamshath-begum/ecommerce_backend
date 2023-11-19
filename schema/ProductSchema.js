const mongoose=require("mongoose")


const ProductSchema=new mongoose.Schema({
   name:{type:String,required:true} ,
   category:{type:String,required:true},

   image:{type:String,required:true},
   price:{type:String,required:true},
   description:{type:String,required:true},
   availability:{type:String,required:true},
   rating:{type:String,required:true},
   cteatedOn:{type:Date,default:Date.now()},

})

const ProductModel=mongoose.model("products",ProductSchema)
module.exports={ProductModel}