import React from 'react';
import './Modals.css';

const AskLogin = (props) => {

    const setModalForLogin =()=>{
        return props.setModal({showModal:true,type:"SignIn"})
    }

    const closeModalForNo =()=>{
        return props.setModal({showModal:false});
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

export default AskLogin
