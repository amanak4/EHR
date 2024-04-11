import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';


import HttpError from "../models/http-error.js";
import { User } from "../models/users.js";


export const getUsers = async (req, res, next) => {
   
    try {
      const user=req.user;
      if(user){
        res.json({
          message:"User details",
    success:true,
    user:user
        })
      }
      else{
        res.json({
          error:"Unauthorized",
    success:false
        })
      }
    } catch (err) {
      const error = new HttpError(
        'Fetching users failed, please try again later.',
        500
      );
      return next(error);
    }
  };

export const register = async (req, res, next) =>{
  
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.json({
          error:"Invalid inputs passsed, please check your data.",
          success:false
        })
    }
    
    const {name, email, password} = req.body;

    let existingUser;
    
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    res.json({
      error:'Signing up failed, please try again later.',
      success:false
    })
  }

  if (existingUser) {
    res.json({
      error:'User exists already, please login instead.',
      success:false
    })
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
   res.json({
     error:'Could not create user, please try again.',
     success:false
   })
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword
  });

  try {
    await createdUser.save();
  } catch (err) {
    res.json({
      error:'Could not create user, please try again.',
      success:false
    })
  }

  let token;
  try {
    token = jwt.sign(
      { email: createdUser.email ,
      name: createdUser.name,},
      'dont_share_token',
      { expiresIn: '1h' }
    );

  } catch (err) {
    res.json({
      error:'Could not  generate token, please try again.',
      success:false
    })
  }
  res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 }); 


  res.status(201).json({
    success:true,
    message:"Successfully registered",
    userName: createdUser.name, 
    email: createdUser.email,
    token:token
  });

};

export const login = async (req,res,next) => {

   const {email , password} = req.body;

   let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
   res.json({
     error:'Logging in failed, please try again later.',
     success:false
   })
  }

  if (!existingUser) {
    res.json({
      error:'Invalid credentials, could not log you in.',
      success:false
    })
  }
 
  let isValidPassword = false;
  try{
    isValidPassword = await bcrypt.compare(password , existingUser.password);
  } catch(err){
   res.json({
     error:'Could not log you in, please check your credentials and try again.',
     success:false
   })
  }
   
  if (!isValidPassword) {
res.json({
  error:'Invalid credentials, could not log you in.',
  success:false
})
  }

  let token;
  try {
    token = jwt.sign(
      {  email: existingUser.email ,
        name: existingUser.name,},
      'dont_share_token',
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new HttpError(
      'Logging in failed(token), please try again later.',
      500
    );
    return next(error);
  }
  res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 }); 

  res.json({
    success:true,
    message:"logging in successful",
    userName:existingUser.name,
    email: existingUser.email,
    token:token
  });

};

export const logout = async (req, res) => {
  res.clearCookie("jwt").json({
      success: true,
      message: "Logout Successfully!"
  });
}
