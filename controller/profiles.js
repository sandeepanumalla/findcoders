var express = require('express');
var app =new express();
const User = require("../models/user");
const bodyParser = require('body-parser');
const { findOneAndDelete, findOneAndUpdate, findById } = require('../models/user');


exports.addProfiles=async (req,res)=>{
    try{
        console.log(req.body)
        const login_name = req.body.login_name;
        const url = req.body.url;
        const avatar_url = req.body.avatar_url;
        const repos_url = req.body.repos_url;
        User.findOneAndUpdate({_id:req.profile._id},
            {
                $addToSet:{
                        "saved_profiles":{
                                            "login_name":login_name,
                                            "url":url,
                                            "avatar_url":avatar_url,
                                            "repo_url":repos_url
                                          }
        }}).exec((err,success)=>{
            if(err){ 
                console.log("error fnding user",err)
            }
            if(success){ 
                console.log("success",success)
                return res.json("Added profile successfully with "+ "status 200");
            }
        })
    }
    catch(err){
        console.log("catching err",err);
    }
}


exports.getProfileDetails = async (req,res) =>{
    try{
        console.log(req.profile._id);
        User.findById({_id:req.profile._id}).exec((err,success)=>{
            if(err){
                console.log("err",err)
            }
           return res.json(success.saved_profiles) /*  console.log("success",success.saved_profiles); */
        })
    }
    catch(err){
        console.log("err in catch",err)
    }
}


exports.deleteProfile = async (req,res) =>{
    try{
        let login_name = req.params.login_name;
        let query = User.findOneAndUpdate({_id:req.profile._id},{
            $pull:{"saved_profiles":{"login_name":login_name}}
        })
        .then((err,success)=>{
            if(err){
                console.log("err in updating",err)
            }
            return res.status(200).json("Successfully deleted user");
        })
    }
    catch(err){
        console.log("err in castArrayLikeObject",err);
    }
}
