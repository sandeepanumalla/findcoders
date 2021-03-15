import React,{useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';



function App() {
  const [values, setValues] = useState("");
  const [Item, setItems] = useState([]);

  useEffect(()=>{
    fetch(`https://jsonplaceholder.typicode.com/${values}`)
    .then(response => response.json())
    .then(json => setItems(json))
    .catch((err)=>{
      setItems("error");
    })

  console.log(setValues);
  },[values])
  return (
    
    <div className="App">
    <input type="text" name="input" onChange={(e)=>{setValues(e.target.value)}}></input>
     <button onClick={()=>setValues("posts")}>Post</button>
     <button onClick={()=>setValues("comments")}>Comment</button>
     <button onClick={()=>setValues("Subscribe")}>Subscribe</button>
     <h1>{values}</h1>
     
     {
       Item.map(item =>{
        return <pre>{JSON.stringify(item)}</pre>
       })
     }
    </div>
    
    
  );
}

export default App;
