import React,{Fragment,useState,useEffect} from 'react';
import "./base.css";
import { signout,isAuthenticated} from '../auth_api/Auth'
import { Redirect, useHistory } from 'react-router';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Nav = (props) => {

  const [authenticated,setAuthenticated] = useState(true)

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
        .then(()=>{setAuthenticated(false)})
        .catch(()=>{console.log("error in signout")});
    }

      useEffect(() => {
        if(authenticated === false){
          return toast.success('🦄 Sign out success!', {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }
      },[authenticated])

     

    return (
        <div>
        <nav>
        <ToastContainer />
          <div className="logo">Github</div>
          <ul className="nav_links">
          
          <li  ><a className="btns" onClick={()=>{goToHome()}}>Home</a></li>
          <li>
          <a className="btns" onClick={()=>setModalProfile()}>Saved Profile</a>
          </li>
          {
            isAuthenticated() ?
            (<li>
              <a className="btns" onClick={()=>onSignout()}>Signout</a>
              </li>
              ):
            (<Fragment>
              <li>
                 <a className="btns" onClick={()=>{setModelHandlerSignUp()}}>Sign Up</a>
              </li>
               <li>
                 <a className="btns" onClick={()=>{setModelHandlerSignIn()}}>Login</a>
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
