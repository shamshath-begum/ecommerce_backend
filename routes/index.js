var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const { dbUrl } = require("../config/dbConfig");
const { UserModel } = require("../schema/UserSchema.js");
const {ProductModel} = require('../schema/ProductSchema.js')
const {hashCompare,hashPassword,createToken,decodeToken,validate,roleAdmin} = require('../config/auth')


mongoose.connect(dbUrl);

router.post('/signup',async(req,res)=>{
  try {
    let user = await UserModel.findOne({email:req.body.email})
    console.log(user)
    if(!user)
    {
        req.body.password = await hashPassword(req.body.password)
        req.body.cpassword = await hashPassword(req.body.cpassword)
        let doc = new UserModel(req.body)
      await doc.save()
      res.status(201).send({
        message:"User created successfully"
    })
    }
    else
    {
      res.status(400).send({message:"Email Id already exists"})
    }
  } catch (error) {console.log(error)
    res.status(500).send({message:"Internal Server Error",error})
  }
})

router.post('/login',async(req,res)=>{
  try {
    let user = await UserModel.findOne({email:req.body.email})
   if(user)
   {
      console.log(await hashCompare(req.body.password,user.password))
      if(await hashCompare(req.body.password,user.password))
      {
        let token = createToken({email:user.email,firstName:user.firstName,lastName:user.lastName,role:user.role})
        res.status(200).send({message:"Login Successfull",user,token,role:user.role})
      }
      else
        res.status(400).send({message:"Invalid Credentials"})
   }
   else
    res.status(400).send({message:"Email does not exists"})
  } catch (error) {console.log(error)
    res.status(500).send({message:"Internal Server Error",error})
  }
})

router.post('/uploadProduct',roleAdmin,async(req,res)=>{
  let doc = new ProductModel(req.body)
      await doc.save()
      res.status(201).send({
        message:"Product uploaded successfully"
    })
 
})

router.get("/product",async(req,res)=>{
  let data=await ProductModel.find({})
  res.send({message:"hello",data

})
})
  

module.exports = router;
