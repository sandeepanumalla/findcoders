import react, { Fragment } from 'react';
import {useState} from 'react';
import './signup.css';
import {signin,authenticate,isAuthenticated} from '../auth_api/Auth';
import { Alert } from 'antd';



 const Signin =({props,setModal,success})=>{

const[values,setValues] = useState({
    username:"",
    password:"",
    error:false,
    errorMsg:""
})

const {username,password,error, errorMsg} = values;

const {user} = isAuthenticated();

const onChangeHandler=(e)=>{
    const name = e.target.name;
    const value = e.target.value;
    if(name == "username"){
        console.log("running")
        setValues({...values,username: value})
    }
     if(name == "password"){
        setValues({...values,password: value})
    }
}

/* console.log("showmodal signup",showModal) */
const onSubmit =()=>{
    if(username==undefined || password==undefined ){
        setValues({...values,error:true, errorMsg:"Input field should not be empty"})
    }
    else if( username.length< 3 ){
        setValues({...values,error:true, errorMsg:"username must be at least 3 characters"})
    }
    else if( password.length<3){
        setValues({...values,error:true, errorMsg:"password must be at least 3 characters"})
    }
    else{
        console.log("running else")
        signin({username,password})
        .then((data)=>{ 
            if(data === undefined){
                setValues({error:true,errorMsg:"Server is not working properly"})
            }
            else if(data === "incorrect Username" || data === "Incorrect  password"){
                setValues({...values,error:true, errorMsg:"Errors with submission"})
            }
            else{
                authenticate(data);
               
            }
            console.log(isAuthenticated());
            if(isAuthenticated()){
                console.log('reunnin')
                return setModal({showModal:false,onSigninSuccess:true})
        
               }
            console.log("data,",data)
            })
        
        .catch((err)=>{
            if(err){
                setValues({error:true,errorMsg:"Something went wrong!"})
            }
            console.log("error in signup",err)})

            
    
    }
    
    
}

    return(
        <div className="signup_container">
         <form>
          
          <input className="username_input" 
             onChange={(e)=>{onChangeHandler(e)}} 
             placeholder="Username" autoComplete='false' 
             name={"username"} type="text">
          </input>

          <input className="password_input" 
           onChange={(e)=>{onChangeHandler(e)}}
             placeHolder="Password" autoComplete='false'
             name={"password"}
             type="password">
          </input>

          
         </form>
         <button className="submit_btn" cursor="pointer" onClick={()=>{onSubmit()}} type="submit">Submit</button>
         <Fragment>
         {
             error ?
             <Alert message={errorMsg} type="error" />:null
         }
         </Fragment>
         
         </div>
         )
        }
        
        export default Signin;
        /* <p style={{color: 'black'}} >{JSON.stringify(values)}</p> */


        /* 
         .then((data)=>{
            console.log("data",data)
            if(data === "incorrect Username" || data === "Incorrect  password"){
                setValues({...values,error:true, errorMsg:"Errors with submission"})
            }
            else{
                authenticate(data);
            }
        
        if(isAuthenticated()){
            
             return setModal({showModal:false,onSigninSuccess:true})

        }
       }
        )
        .catch((err)=>{
            if(err){
                setValues({error:true,errorMsg:"Server is not working properly"})
            }
            console.log("error in signin",err)
    setValues({error:true,errorMsg:"error in signing "})
    })
        */