import React from 'react';
import { isAuthenticated } from '../auth_api/Auth';


const CheckProfiles = async()=>{
  try { console.log();
    let id = isAuthenticated().user._id;
    let token = isAuthenticated().token;
    return await fetch(`http://localhost:8080/api/profile/getProfiles/${id}`,{
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "content-type": "application/json",
            "Authorization":"Bearer " + token,
        },
        Body: JSON.stringify()
    })
    .then(response =>response)
    .catch(err =>console.log(err));}
    catch(err){
        console.log(err);
    }

}

export default CheckProfiles;