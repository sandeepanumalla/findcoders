import React,{useState,useEffect,useRef} from 'react'
import './Search.css';
import Result from './Results';
import axios from 'axios';
import CheckProfiles from '../profile_api/AddedProfile';
import { Input } from 'antd';
import 'antd/dist/antd.css';



export default function Search(props) {

    const [values, setValues] = useState({
        
        loading:false,
        error: false,
        repos_url:[],
        repos_data:[],
        first:false,
        login_name:[],
        check_profiles:[],

    });
    const [Term,setTerm] = useState('')

    const [debouncedTerm,setDebouncedTerm] = useState(Term)

    const [Items, setItems] = useState([]);
   
    const {check_profiles,login_name,first,repos_data,repos_url,loading,error} = values;
  
    console.log("props.settrigger",props.setTrigger);
      console.log("serach term",Term);

      useEffect(() => {
        const timerId = setTimeout(() => {
          setDebouncedTerm(Term);
        }, 1300);
    
        return () => {
          clearTimeout(timerId);
        };
      }, [Term]);

/* useEffect(() => {

    const run = async()=>{
     CheckProfiles()
     .then(response=>{
 
       return response.json()
     })
     .then(data =>
         {
             console.log(data.length);
            setValues({check_profiles:data});
             console.log(data)
     })
     .catch(err => console.log(err));

    }
    setTimeout(() => {
      run();
    },1300)
    
 },[])
 console.log("check_profiles",check_profiles); */
     

    useEffect(()=>{
      const fetchData = async() =>{
        console.log(debouncedTerm.length);
        if(debouncedTerm.length === 0 || debouncedTerm === ""){
          console.log("response not ok ")
           return setValues({first:true});
        }
        else{
          await fetch(`https://api.github.com/users/${debouncedTerm}`)
        .then((response) =>{
          console.log(response);
          if(response.ok === false){
            console.log("response not ok ")
            setValues({error:true});
          }
          return response.json();
        }
        )
        .then((data) =>{console.log(data);
            if(data.message === "Not Found"){
                console.log("response not ok ")
                setValues({error:true});
              }
              else{
                    setItems([data]);
                    setTimeout(() =>{
                      setValues({repos_url:data.repos_url})
                    },10)
                    
                    console.log(Items) 
                    console.log(data);
                    console.log("this is repos_url",repos_url);
                    console.log(data.repos_url);
              }
        })
        
        .catch((err)=>{console.log(err);
            setValues({error:true});
            })
          
        }
      }

      setValues({loading:true});


     const timeoutId = setTimeout(()=>{
       fetchData();
       
       setValues({loading:false});
      console.log("fetching in 1.3 seconds");
      },500)
      console.log("running effect");

      return () =>{
        clearTimeout(timeoutId);
        console.log("cleanup");
      }

    },[debouncedTerm])
console.log("repos_url",repos_url);
    return (
        <div>
        <div className="search">
            
             <Input  className="search_user"  onChange={(e) => setTerm(e.target.value)} name="search" placeholder="Search"></Input>
        </div>
        <Result setTriggerItem={props.setTrigger} loginname={login_name} initial={first} repoUrl={repos_url} loadingProps={loading} errorProps={error} data={Items} />
        
        </div>
    )
}


/* 
<input  className="search_user" type="text" placeholder="search" 
            value={Term}
            onChange={(e) => setTerm(e.target.value)} name="search"></input>
*/