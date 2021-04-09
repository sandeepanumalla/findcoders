import React from 'react'
import {useState,useEffect} from 'react';
import './Modals.css';
const RepoModal = (props) => {

    const [values,setValues] = useState({
        /* repos:undefined
        */
    })

    const [repos,setRepos] = useState([]);

    
 let arry =[];

    useEffect(()=>{
        const fetchAsync = async ()=>{
            if(props.repoLink === undefined){
                console.log("no info")
            }
            else{
               await fetch(`${props.repoLink}`)
            .then(data =>{
                console.log(data.type)
                if(data.type == "cors"){
                    console.log("running");
                    return data.json();
                }

               console.log(data)
               console.log(props.repoLink);
                
            })
            .then(data =>{
                
                let arry =[];
                for(let i=0;i<5;i++){
                     arry[i] = data[i];
                    
                }
               
                console.log(arry);
                
                return arry
                
            })  
            .then(data =>{
                setRepos(data);
                console.log(repos);
            })
            
            .catch(err => console.log(err))
                }
            }
        fetchAsync()   
    },[props.repoLink])

    return (
        <div>
            {props.showModal ? 
     
                <div>
                 <div className="popup-item">
                  <div className="header">
                    <h2  className="modal_title" >Top Repos </h2>
                    <span className="btn">
                    <button onClick={()=>{props.setTrigger(false)}}>X</button></span>
                  </div>
                  
                  {
                      repos.map(repo => 
                        <div className="RepoModal_container">
                        <div className="RepooModal_item">
                             <a key={repo.id} href={repo.html_url} target="_blank">{repo.name}</a>
                         </div>
                         </div>
                        )
                     
                  }
                  
                
                 <div>
                 
                 </div>
                
                 </div>
                 <div className="popup" onClick={()=>{props.setTrigger({viewRepoModal:false})}} ></div>
                 </div>
              :  ""
              }
              </div>
        
    )
}

export default RepoModal
