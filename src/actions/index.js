import axios from "axios";
import CheckProfiles from "../profile_api/AddedProfile";



export const fetchCheckProfiles = ()=> async dispatch => {
        const response1 = await CheckProfiles()
        .then(response =>response.json())
        console.log(response1);
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
       console.log("running fetchCheckProfiled")
        dispatch({
            type:"FETCH_CHECKPROFILES",
            payload: response1,
        })
}; 

/*  default deleteProfileFromStore */