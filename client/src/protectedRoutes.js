import React from 'react';
import { Redirect, Route } from 'react-router';
import { isAuthenticated } from './auth_api/Auth';

const protectedRoutes = ({component: Component, ...rest}) => {
    return (
        <Route  {...rest}
        render={props =>{
            if(isAuthenticated()){
                return <Component {...props} />;
            }
            else{
                return <Redirect to={
                    {
                        pathname:"/home",
                        state:{
                            from:props.location
                        }
                    }
                } />
            }
        }}
        
        />
        
        
    )
}

protectedRoutes.propTypes = {

}

export default protectedRoutes
