import React,{useState} from 'react'
import './Results.css';
export default function Results({data, loading }) {

    const [info, setInfo] = useState([]);

    console.log("data in Results", data.map(e=>JSON.stringify(e)));
    return (
        <div >
            
                
            <div className="container">
             {
                 data.map(data =>{
                     return (<div className="item_container">
                           <h3>{data.login}</h3>
                            <div className="image_container" 
                            style={{background:`url(${data.avatar_url})`,backgroundSize:`cover`}} ></div>
                           </div>)
                 })
                 
             }
            </div>
        </div>
    )
}
