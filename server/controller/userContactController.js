const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userModel=require("../model/userModel")


//Post register
exports.registerController =async (req,res)=>{
  try {
      const {name,email,password,phone,address}= req.body
      if(!name&& !email && !password && !phone && !address){
          return res.send({error:"All fields are required"})
      }
  
     //exsisting user find
     const exist= await userModel.findOne({email})
     if(exist){
      return res.status(200).send({message:"Email taken already"})
     }
  
     //password check
     if(password.length<6){
      return res.status(400).send({message:"Password should be 6 character long"})
     }
  
     //password bcrypt
     const hashedPassword= await bcrypt.hash(password,10)
  
     //save registration
     const user =new userModel({name,email,phone,address,password:hashedPassword})
     await user.save()
  
     res.status(201).send({message:"Account created successfully",user})
  
  
  
  } catch (error) {
      res.json({error:'error signing up'})
  
  }
  }
  
  //Post Login
exports.loginController= async(req,res)=>{
  try {
      const{email,password}=req.body
      if(!email && !password){
          return res.json({message:"email and password must be required"})
      }
      const user=await userModel.findOne({email})
      if(!user){
          return res.json({error:"Please enter your valid email address"})
      }
//password matching
      const match= await bcrypt.compare(password,user.password)
      if(!match){
          return res.json({message:"Password do not match"})
      }
      
//token 
      const token= jwt.sign({id:user._id,name:user.name},process.env.JWT_SECRET,{expiresIn:"9h"})  
      res.status(200).send({message:"login successfull",user:{
          name:user.name,
          _id:user._id,
          email:user.email,
          phone:user.address,
          role:user.role
      },token})
     
console.log(user)
  } catch (error) {
      console.log(error)
      res.status(500).send({message:"Error in login"})
  }
  
}
