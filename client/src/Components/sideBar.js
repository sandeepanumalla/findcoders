import React,{useState,useEffect,Fragment} from 'react';
import { isAuthenticated, signout } from '../auth_api/Auth';
import './sideBar.css'
import { Redirect, useHistory } from 'react-router';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SideBar = (props) => {

    const [authenticated,setAuthenticated] = useState(true)

    let history = useHistory();
  
      const setModelHandlerSignUp =() =>{
        
        props.setValueSidebar(false)
          return props.setTriggerValue({showModal:true,type:"SignUp"});
        }
        const setModelHandlerSignIn=()=>{
            props.setValueSidebar(false)
          return props.setTriggerValue({showModal:true,type:"SignIn"});
        }
  
        const setModalProfile = () =>{
         /*  console.log("sdfdf",isAuthenticated) */;
         props.setValueSidebar(false)
          if(!isAuthenticated()){
            return props.setTriggerValue({showModal:true,type:"You are required to Login First"});
          }
          if(isAuthenticated()){
          /*   console.log("running"); */
            return history.push("/profiles")
          }
          
        }
      
        const goToHome = () =>{
            props.setValueSidebar(false)
          history.push("/");
        }
  
        const onSignout =()=>{
         /*  console.log('onSubmit running'); */
          <Redirect to="/"/>
          signout()
          .then(()=>{
            props.setValueSidebar(false)  
            setAuthenticated(false)})
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
        
            <div className={props.sideBarValue  ? 'nav_links_sidebar active':'nav_links_sidebar'}>
            <ul className="nav_links_ul">
          <li><a className="btns_sidebar" onClick={()=>{props.setValueSidebar(false)}}>X</a></li>
        <li  ><a className="btns_sidebar" onClick={()=>{goToHome()}}>Home</a></li>
        <li>
        <a className="btns_sidebar" onClick={()=>{setModalProfile()}} >Saved Profile</a>
        </li>
        {
          isAuthenticated() ?
          (<li>
            <a className="btns_sidebar" onClick={()=>onSignout()}>Signout</a>
            </li>
            ):
          (<Fragment>
            <li>
               <a className="btns_sidebar" onClick={()=>{setModelHandlerSignUp()}}>Sign Up</a>
            </li>
             <li>
               <a className="btns_sidebar" onClick={()=>{setModelHandlerSignIn()}}>Login</a>
             </li>
            </Fragment>
            )
        }
       
        </ul>
            </div>
        </div>
    )
}

export default SideBar
