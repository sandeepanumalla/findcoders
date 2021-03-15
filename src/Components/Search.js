import React,{useState,useEffect,useRef} from 'react'
import './Search.css';
import Result from './Results';
import axios from 'axios';

const CancelToken = axios.CancelToken;

export default function Search() {

    const [values, setValues] = useState({
        search:"",
        loading:false,
        error: false
    });

    const [Items, setItems] = useState([]);
   
    const{loading,error} = values
  
    let cancelToken;
    const handleSearchChange = async (e) => {
      const searchTerm = e.target.value;     
      if (typeof cancelToken != typeof undefined) {
        cancelToken.cancel("Operation canceled due to new request.");
        setValues({loading:true});
      }
  
      cancelToken = axios.CancelToken.source();
  
      try {
        const results = await axios.get(
          `https://api.github.com/users/${searchTerm}`,
          { cancelToken: cancelToken.token } //Pass the cancel token to the current request
        );
        setItems([results.data]);

        console.log("Results for " + searchTerm + ": ", results.data);
        console.log("Results from " + "setItem" + ": ", results.data);
      } catch (error) {
        console.log(error);
        setValues({error:true});
      }
    };

   
    
    
    return (
        <div>
        <div className="search">
            <input  className="search_user" type="text" placeholder="search" 
             onChange={handleSearchChange} name="search"></input>
        </div>
        <Result  loading={loading} error={error} data={Items} />
        </div>
    )
}
