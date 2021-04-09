var mongoose = require("mongoose");

const {Schema} = mongoose;

const reqString={
    type:String,
    required:true,
    unique:true
}

const req ={
    type:String,
    unique:true
}
/* const reqProfile ={
    unique:true,
    login_name:req,
     url:req,
                        avatar_url:req,
     repo_url:req
} */



const reqarr = [];
const userSchema = new Schema({
    username:reqString,
    password:reqString,
    
    saved_profiles:[{   
                        login_name:req,
                        url:req,
                        avatar_url:req,
                        repo_url:req
                    }]
})
module.exports = mongoose.model('User',userSchema);

