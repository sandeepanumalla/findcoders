import axios from "axios";
import { isAuthenticated } from "../auth_api/Auth";
import CheckProfiles from "../profile_api/AddedProfile";



export const fetchCheckProfiles = ()=> async dispatch => {
        let response1
        if(!isAuthenticated()){
          
         return response1 = null;
        }
        else{
          response1 = await CheckProfiles()
          .then(response =>response.json())
        }
       
        console.log("isAuthenticated",isAuthenticated());
        
        console.log(response1);
      /*   const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`) */
       console.log("running fetchCheckProfiled")
        dispatch({
            type:"FETCH_CHECKPROFILES",
            payload: response1,
        })
}; 

/*  default deleteProfileFromStore */