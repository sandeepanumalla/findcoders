import react from 'react';
import SignUp from './signup';
import {useState} from 'react';
import './signup.css';
import {signup} from '../auth_api/Auth';

const Signup = (props) =>{

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
        if(username=="" || password=="" ){
            setValues({error:true, errorMsg:"Input field should not be empty"})
        }
        else{
            console.log("running else")
            signup({username,password})
            .then((response)=>{response.json()})
            .then((data)=>{console.log(data)
               
            })
            .catch((err)=>{console.log("error in signup",err)});
            
        } 
    }

    console.log("username")
    
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
           placeholder="confirm_password" name="confirm password" type="password" >
           </input>

 

          </form>
          
          <button className="submit_btn" onClick={onSubmit} cursor="pointer"  type="submit">
          Create User
       </button>
          <p style={{color: 'black'}} >{JSON.stringify(values)}</p>
        </div>
    )
}

export default Signup;