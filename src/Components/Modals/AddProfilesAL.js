import React from 'react'
import Signin from '../signin';
import {useState} from "react"
import ModalBox from './Modals';


const AddProfilesAL = (props) => {

    const [values,setValues] = useState(false);

   const closeModalForNo = ()=>{
       return props.setTrigger({askLogin:false});
   }

   const setModalForLogin =() =>{
       return props.setTrigger({askLogin:false});
   }

    return (
        <div>
     {props.modal ? 
     
      <div>
       <div className="popup-item">
        <div className="header">
          <h2  className="modal_title" >Please Login to Add the user </h2>
          <span className="btn">
        
            <button onClick={()=>{props.setTrigger({askLogin:false})}}>X</button>
          
          </span>
        </div>
       <div>
            <div className="dialogue" >
             <p>Please Login to continue</p>
            </div>
            
            <div className="btns">
                <button className="no" onClick={()=>closeModalForNo()}>No</button>
                <button className="yes" onClick={()=>setModalForLogin()}>Yes</button>
            </div>
        </div>

       </div>
       <div className="popup" onClick={()=>{props.setTrigger({askLogin:false})}} ></div>
       </div>
    :  ""
    }
    </div>
    )
}

export default AddProfilesAL
