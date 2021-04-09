import React from 'react';
import { isAuthenticated } from '../auth_api/Auth';
import Results from '../Components/Results';



const AddProfile = async (user) =>{
    console.log(isAuthenticated());
    try{
        const id = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        console.log("token",token);
        console.log("user", id);
        console.log("user", user);
        return fetch(`http://localhost:8080/api/profile/${id}`,{
            method: 'POST',
            headers: {
                        "Accept": 'application/json',
                        "content-type": "application/json",
                        'Authorization': 'Bearer ' + token 
            },
            body: JSON.stringify(user)
        })
        .then(response =>response
          
        )
        /* .then(data =>console.log(data)) */
        .catch(err =>console.error(err));
    }
    catch(err){
        
        console.log(err);
    }
}

export default AddProfile;