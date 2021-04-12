import React from 'react'
import { BASE_URL, isAuthenticated } from '../auth_api/Auth'


const deleteProfile = async (user) => {
    let login_name = user.login_name;
  /*   console.log("login_name",login_name);
    console.log("login_name",user); */
    try{
        let id = isAuthenticated().user._id;
        let token = isAuthenticated().token;
        return await fetch(`/api/profile/delete/${id}/${login_name}`,{
            method:"POST",
            headers:{
                "Accept": "application/json",
                "content-type": "application/json",
                "Authorization":"Bearer " + token
            },
            body: JSON.stringify()
        })
        .then(response=>response)
        .catch(err=>console.log("err in fetching",err));
    }
    catch(err){
        console.log("err in heellocatching in",err) 
    }  
}

export default deleteProfile
