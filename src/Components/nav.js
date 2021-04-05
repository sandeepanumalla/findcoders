import React,{Fragment} from 'react';
import "./base.css";
import { signout,isAuthenticated} from '../auth_api/Auth'
import { Redirect, useHistory } from 'react-router';



const Nav = (props) => {
  let history = useHistory();

    const setModelHandlerSignUp =() =>{
        return props.setTrigger({showModal:true,type:"SignUp"});
      }
      const setModelHandlerSignIn=()=>{
        return props.setTrigger({showModal:true,type:"SignIn"});
      }

      const setModalProfile = () =>{
        console.log("sdfdf",isAuthenticated);
        if(!isAuthenticated()){
          return props.setTrigger({showModal:true,type:"You are required to Login First"});
        }
        if(isAuthenticated()){
          console.log("running");
          return history.push("/profiles")
        }
        
      }
    
      const goToHome = () =>{
        history.push("/home");
      }

      const onSignout =()=>{
        console.log('onSubmit running');
       
        
        signout()
        .then(()=>{console.log("signed out successfully")})
        .catch(()=>{console.log("error in signout")});
    }

    return (
        <div>
        <nav>
        
          <div className="logo">Github</div>
          <ul className="nav_links">
          
          <li onClick={()=>{goToHome()}} ><button>Home</button></li>
          <li>
          <button  onClick={()=>setModalProfile()}>Saved Profile</button>
          </li>
          {
            isAuthenticated() ?
            (<li>
              <button onClick={()=>onSignout()}>Signout</button>
              </li>
              ):
            (<Fragment>
              <li>
                 <button onClick={()=>{setModelHandlerSignUp()}}>Sign Up</button>
              </li>
               <li>
                 <button  onClick={()=>{setModelHandlerSignIn()}}>Login</button>
               </li>
              </Fragment>
              )
          }
         
          </ul>
        </nav>
        </div>
    )
}

export default Nav
