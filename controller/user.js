const bcrypt = require('bcryptjs');
const User = require("../models/user");
const jwt = require('jsonwebtoken');
require('dotenv').config();
var express = require('express');
var expressJwt = require('express-jwt');
var app = express();
const{body,validationResult} = require("express-validator");

exports.signUp = async (req,res)=>{
    try{
        const user= new User({
            username: req.body.username,
            password: req.body.password
            
        });
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(422).json(errors.array())
        }
        /* body('username').isLength({min:5})
        body('password').isLength({min:5}).equals(req.body.password); */
        var salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        
        const result = await user.save((err,success)=>{
            if(success){
                res.json(success);
            }
            if(err){
                if(err.name === 'MongoError' || err.code === '11000'){
                    console.log(err);
                    return res.json("username has already taken. try different one.")
                }
            }
        })
       
       
    }
    catch(err){
        console.log("err",err);
        
    }
}

exports.signin = async(req,res)=>{
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(422).json(errors.array())
        }
        let validUser = await User.findOne({username:req.body.username});
        if(!validUser) return res.status(400).json("incorrect Username");

    
        const validPassword =  await bcrypt.compare(req.body.password, validUser.password);
        if(!validPassword) return res.status(400).json("Incorrect  password");

        const token = jwt.sign({_id: validUser._id}, "516ff6f7349e9ff70daf55911b02dc5d9a4669c2721ac68f6e7b9c383fa4e2ed6197bfeb837444656534501831e574aaa62370d70b7a0cf0d6aef4e20dff74d5" ,{expiresIn: 86400});

        res.cookie("token",token, {expire: new Date() + 86400});

        const { _id, uname} = validUser;
        
        req.user = validUser;
        console.log("token",token)
        console.log(req.user);
        return res.json({token,user:{_id, uname}});
    }
    catch(err){
        console.log(err);
    }
}

exports.signout=(req,res)=>{
    res.clearCookie("token");
    res.json({
        message: "User signed out successfully"
    });
}
exports.isSignedIn=expressJwt({
    algorithms: ['sha1', 'RS256', 'HS256'],
    secret: "516ff6f7349e9ff70daf55911b02dc5d9a4669c2721ac68f6e7b9c383fa4e2ed6197bfeb837444656534501831e574aaa62370d70b7a0cf0d6aef4e20dff74d5",
    userProperty: "auth",
  
})
exports.isAuthenticated =  (req,res,next)=>{
    console.log(req.auth);
    let checker =  req.auth._id == req.auth._id;
    if(!checker) return res.status(403).json({
        error:( "Access Denied")
    })
    console.log("fff",req.auth)
    next();
}
exports.getUserById = (req,res,next,id)=>{
    console.log("id ",id);
    User.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                err: err,
                error: "No user was found"
            });
            
        }
        req.profile = user;
        next();
    })
}