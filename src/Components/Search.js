import React,{useState,useEffect,useRef} from 'react'
import './Search.css';
import Result from './Results';
import axios from 'axios';

const CancelToken = axios.CancelToken;

export default function Search() {

    const [values, setValues] = useState({
        search:"",
        loading:false,
        
    });
   
    const prev = useRef(``);

    const {search, loading} = values;
    
    const handleChange =(e)=>{
        let name= e.target.name;
        let value = e.target.value;
        if(name == "search"){
            setValues({...values,search:value});
        }
        
    }
    console.log(search);
    
   

    useEffect(()=>{
        prev.current = search;
        console.log(prev.current)
        const searchUrl = `https://api.github.com/users/${search}`;
      
        

        axios.get(searchUrl,{
            cancelToken:prev.current.token
        })
        .then(res => console.log(res));
        
        
            
        /* fetch(`https://api.github.com/users/${search}`)
        .then(response => response.json())
        .then(json => console.log(json))
        .catch((err)=>{
          console.log(err)
        }) */
        
        
        
    
      
      },[search])
    
    
    return (
        <div>
        <div className="search">
            <input  className="search_user" type="text" placeholder="search" 
             onChange={(e)=>{handleChange(e)}} name="search"></input>
        </div>
        <Result loading={loading} name={values.search} />
        </div>
    )
}
