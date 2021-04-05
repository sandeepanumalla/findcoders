

const profileReducer = (state=[], action) =>{
    console.log("actios",action);
    switch(action.type){
        case 'FETCH_CHECKPROFILES': 
            return action.payload;
            break;
        case 'DELETE_PROFILE' : {
            console.log("running delete profile reducer")
            return state.filter(profile => profile.login_name !== action.payload);
            break;
        }

        default: return state
    }
  /*   if(action.type === 'FETCH_CHECKPROFILES'){
        console.log("running profileReducer");
        console.log("kdfsddf",action.payload)
        return action.payload
    }
    else if(action.type === 'DELETE_PROFILE'){
        console.log("deleting profileReducer");
        return state.filter(profile => profile.login_name !== action.payload)
    }
    return state; */
}

export default profileReducer; 