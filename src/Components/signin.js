import react from 'react';
import {useState} from 'react';
import './signup.css';
import {signin,authenticate,isAuthenticated} from '../auth_api/Auth';

 const Signin =(props)=>{

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


const onSubmit =()=>{
    if(username=="" || password=="" ){
        setValues({error:true, errorMsg:"Input field should not be empty"})
    }
    else{
        console.log("running else")
        signin({username,password})
        .then((data)=>{console.log(data);
        authenticate(data);
        if(isAuthenticated()){
            setValues({error:false})
        }
    }
        )
        .catch((err)=>{console.log("error in signup",err)
    setValues({error:true,errorMsg:"error in signing up"})
    });
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
         <p style={{color: 'black'}} >{JSON.stringify(values)}</p>
         </div>
    )
}

export default Signin;