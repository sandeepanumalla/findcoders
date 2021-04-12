import React,{useEffect, useState} from 'react'

import './Modals.css';

import Signup from '../signup';
import SignIn from '../signin';

import {signup,signin, authenticate} from '../../auth_api/Auth';
import AskLogin from './AskLogin';
import AddProfilesAL from './AddProfilesAL';



export default function ModalBox(props) {

  const [values,setValues] = useState({
    username:"",
    password:"",
    confirm_password:"",
    error:"",
    hello:"hello theere"

})

const {username,password,confirm_password} = values;

const handleChange = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    console.log(name);
    console.log(value);
    if(name == "username"){
        console.log("running")
        setValues({...values, username: value})
    }
    if(name == "password"){
        setValues({...values,password: value})
    }
      if(name == "confirm_password"){
        setValues({...values, confirm_password: value})
    }
}

const onSubmit =()=>{
  console.log('onSubmit running');
 console.log(username,password);
  
  signin({username,password})
  .then((data)=>{console.log(data);
   authenticate(data);
  })
  .catch((error)=>{console.log(error)});
}



  return(
    <div>
     {props.modal ? 
     
      <div className="popup-parent" >
       <div className="popup-item repo_first">
        <div className="header">
          <h2  className="modal_title" >{props.typeOfModal} </h2>
          <span className="btn">
          {
            props.typeOfModal == "You are required to Login First" || 
            props.typeOfModal == "You are required to Login"
            ?null:
            <button onClick={()=>{props.setTrigger(false)}}>X</button>
          }
          </span>
        </div>
       <div>
       {
        props.typeOfModal == "SignUp" ?
        <Signup  setModal={props.setTrigger} formType={props.typeOfModal} ></Signup>
        : null || props.typeOfModal == "SignIn"?
        <SignIn  setModal={props.setTrigger} formType={props.typeOfModal} ></SignIn>
        :null || props.typeOfModal == "You are required to Login First"?
        <AskLogin  setModal={props.setTrigger} ></AskLogin>:null ||
         props.typeOfModal == "You are required to Login"?
         <AddProfilesAL setModal={props.closeModal}></AddProfilesAL>:null
       }
       </div>

       </div>
      
       {
        
        props.typeOfModal == "SignUp"?
        <div className="popup" onClick={()=>{props.setTrigger({showModal:false})}} ></div>:
        null
         ||
         props.typeOfModal == "SignIn"?
        <div className="popup" onClick={()=>{props.setTrigger({showModal:false})}} ></div>:
        null|| 
        props.typeOfModal == "You are required to Login First"?
        <div className="popup" onClick={()=>{props.setTrigger({showModal:false})}} ></div>:
        null
        ||  
        props.typeOfModal == "You are required to Login"?
        <div className="popup" onClick={()=>{props.closeModal({UnauthorizedAskLogin:false})}} ></div>:
        null
       
       }
       
      
       </div>
    :  ""
    }
    </div>
  )
}



/* 
{
  props.typeOfModal == "SignUp" ?
  <Signup formType={props.typeOfModal} ></Signup>
  : null || props.typeOfModal == "SignIn"?
  <SignIn formType={props.typeOfModal} ></SignIn>
  :null

   <div className="signup_container" >
    </div>
     <form>

         <input className="username_input" onChange={(e)=>{handleChange(e)}} 
         placeholder="username" name="username" type="text">
         </input>
         <input className="password_input" onChange={(e)=>{handleChange(e)}} 
         placeholder="password" name="password" type="password" >
         </input>
         <input className="password_input" onChange={(e)=>{handleChange(e)}} 
         placeholder="confirm_password" name="confirm password" type="password" >
         </input>

         <button className="submit_btn" onClick={props.data("heelo")} cursor="pointer"  type="submit">
            Create User
         </button>
         <button className="sd"  >dff</button>

        </form>
} */

