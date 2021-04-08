import React from 'react'
import Signin from '../signin';
import {useState} from "react"
import ModalBox from './Modals';


const AddProfilesAL = (props) => {

    const [values,setValues] = useState(false);

   const closeModalForNo = ()=>{
       return props.setModal({UnauthorizedAskLogin:false});
   }

   const setModalForLogin =() =>{
       return props.setModal({UnauthorizedAskLogin:false});
   }

    return (
        <div>
            <div className="dialogue" >
            <p>Please Login to continue</p>
            </div>
           
            <div className="btns">
              <button className="no" onClick={()=>closeModalForNo()}>No</button>
              <button className="yes" onClick={()=>setModalForLogin()}>Login</button>
            </div>
        </div>
    )
}

export default AddProfilesAL
