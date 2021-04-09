export const deleteProfileFromStore = (login_name) => {
    console.log("deleting profile",login_name);
    return{
            type:"DELETE_PROFILE",
            payload:login_name
        }
    
} 