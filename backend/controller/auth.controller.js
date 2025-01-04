import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import { generateTokenAndsetCookie } from "../utils/generateToken.js";

export const signup = async(req,res)=>{
  try {
    const {email,username,password} = req.body;

    if(!email || !username || !password){
      return res.status(400).json({success:false,message:"All fields are required"});
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(email)){
      return res.status(400).json({success:false,message:"Invaild email"});
    }

    if(password.length<6){
      return res.status(400).json({success:false,message:"password must be at least 6 character"});
    }

    const existingUserByEmail = await User.findOne({email:email});
    if(existingUserByEmail){
      return res.status(400).json({success:false,message:"email already exists"});
    }

    const existingUserByUsername = await User.findOne({username:username});
    if(existingUserByUsername){
      return res.status(400).json({success:false,message:"username already exists"});
    }

    const salt = await bcryptjs.genSalt(10)
    const hashPassword = await bcryptjs.hash(password,salt)

    const PROFILE_PICS =["/avatar1.png","/avatar2.jpg","/avatar3.png"];

    const image = PROFILE_PICS[Math.floor(Math.random()*PROFILE_PICS.length)];

    const newUser= new User({
      email,
      password:hashPassword,
      username,
      image
    });

    generateTokenAndsetCookie(newUser._id,res)
  
    await newUser.save();

    res.status(201).json({success:true,user:{
      ...newUser._doc,
      password:""
    }})

  } catch (error) {
    console.log("error in signup controller", error.message);
    res.status(500).json({success:false,message:"Internal server error"});
  }
}

export const login =async(req,res)=>{
  try {
    const {email,password}=req.body;

    if(!email || !password){
      return res.status(400).json({success:false,message:"All fields are required"});
    }

    const user = await User.findOne({email:email})
    if(!user){
      return res.status(400).json({success:false,message:"Invaild credintial"})
    }
    const isPasswordCorrect = await bcryptjs.compare(password,user.password);

    if(!isPasswordCorrect){
      return res.status(400).json({success:false,message:"Invalid creditial"})
    }

    generateTokenAndsetCookie(user._id,res)

    res.status(201).json({
      success:true,
      user:{
        ...user._doc,
        password:""
      }
    })

  } catch (error) {
    console.log("error in login controller",error.message)
    res.status(500).json({success:false,message:"Internal server error"})
  }
}


export const logout =async(req,res)=>{
 try {
  res.clearCookie("jwt-netflix");
  res.status(200).json({success:true,message:"logged out successfully"})
 } catch (error) {
  console.log("error in logout controller",error.message)
  res.status(500).json({success:false,message:"Internal server error"})
 }
}


export const authCheck=(req,res)=>{
  try {
    res.status(200).json({success:true,user:req.user})
  } catch (error) {
    console.log("error in authcheck controller",error.message)
    res.status(500).json({success:false,message:"Internal server error"})
  }}