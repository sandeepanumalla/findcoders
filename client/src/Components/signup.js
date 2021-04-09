import react from 'react';
import SignUp from './signup';
import {useState,Fragment} from 'react';
import './signup.css';
import {signup} from '../auth_api/Auth';
import { Alert } from 'antd';


const Signup = (props) =>{

    const [values,setValues] = useState({
        username:"",
        password:"",
        confirm_password:"",
        error:"",
        errorMsg:"",
        hello:"hello theere"

    })

    const {error,errorMsg,username,password,confirm_password} = values;

    const handleChange = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        console.log(name);
        console.log(value);
        if(name == "username"){
            console.log("running")
            setValues({...values,username: value})
        }
         if(name == "password"){
            setValues({...values,password: value})
        }
         if(name == "confirm_password"){
            setValues({...values,confirm_password: value})
        }
    }

    const onSubmit =()=>{
        console.log("running onsubmit")
        if(confirm_password == ""){
            console.log("confirm_password");
        }
        if(username=="" || password=="" ){
            setValues({error:true, errorMsg:"Input field should not be empty"})
        }
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
            if(password == confirm_password){
                console.log("running else")
            signup({username,password})
            .then((response,error)=>{
                console.log("error,",error)
                response.json()})
            .then((data)=>{console.log(data)
            })
            .catch((err)=>{
                if(err){
                    setValues({error:true,errorMsg:"Something went wrong!"})
                }
                console.log("error in signup",err)});
            }
            else{
                setValues({...values, error:true, errorMsg:"confirm password should match"})
            } 
            
        }
        
    }

   /*  console.log("is mathced",password === confirm_password);
    console.log("password",password );
    console.log("confirm_password",confirm_password);
     */
    return(
        <div className="signup_container" >
          <form>

           <input className="username_input" onChange={(e)=>{handleChange(e)}} 
           placeholder="username" name="username" type="text">
           </input>
           <input className="password_input" onChange={(e)=>{handleChange(e)}} 
           placeholder="password" name="password" type="password" >
           </input>
           <input className="password_input" onChange={(e)=>{handleChange(e)}} 
           placeholder="confirm_password" name="confirm_password" type="password" >
           </input>

 

          </form>
          
          <button className="submit_btn" onClick={onSubmit} cursor="pointer"  type="submit">
          Create User
       </button>
       <Fragment>
       {
        error ?
           <Alert message={errorMsg} type="error" />:null
       }
       </Fragment>
         
        </div>
    )
}

export default Signup;