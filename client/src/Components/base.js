
import React,{Fragment, useState,useEffect} from 'react'
import "./base.css";

import ModalBox from './Modals/Modals';
import Search from './Search'
import { isAuthenticated, signout} from '../auth_api/Auth'
import Nav from './nav';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Base() {
  
  const [values, setValues] = useState({
    showModalSignup : false,
    showModalSignin : false,
    show:"",
    password:"",
    errorSignup:"",
    successLogin:"",
    showPopup:false,
  }) 

  const [modal,setModal] = useState({
    type:"",
    showModal:false,
    onSigninSuccess:false,
    dataInfo:"",
    type:"",
    username : "new_user1",
    password : "new_user_password",
    showModalSignIn:false
  });
  
const {User} = isAuthenticated();

  const{showModalSignup,showPopup,showModalSignin,successLogin, errorSignup, successSignup} = values;

  const {onSigninSuccess,username,password,type,showModal,showModalSignIn} = modal;

  const notify = () => toast("Wow so easy!");

console.log("showmodal",showModal);
console.log("username",username);
console.log("isAuthenticated",isAuthenticated());
console.log("insdfing",onSigninSuccess);
 
useEffect(() => {
  if(onSigninSuccess){

    return toast.success('🦄 Sign in success!', {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    
  }

},[onSigninSuccess])


 
    return (
        <div>
        <ToastContainer />
        <ModalBox modal={showModal} data={setModal} 
        typeOfModal={type} onSuccess={onSigninSuccess} setTrigger={setModal}></ModalBox>
            <Nav  setTrigger={setModal}></Nav>
            <div className="heading_animation">
              <h2>Search any Github user here</h2>
              
            </div>{
              successSignup?(<div className="success_alert"><p>Signed Up successfully please login</p></div>):null
            }
            
            <Search setTrigger={setModal} />


</div>
 
            
      
    )
}

/* 
<nav>
            
              <div className="logo">Github</div>
              <ul className="nav_links">
              <li><button>Saved Profile</button></li>{
                isAuthenticated() ?
                (<li>
                  <button onClick={()=>onSignout()}>Signout</button>
                  </li>):
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
            </nav> */