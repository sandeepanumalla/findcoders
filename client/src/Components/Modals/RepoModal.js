import React from 'react'
import {useState,useEffect} from 'react';
import './Modals.css';
const RepoModal = (props) => {

    const [values,setValues] = useState({
        /* repos:undefined
        */
       No_repos:false,
       Empty_repo_Array:false
    })

    const [repos,setRepos] = useState([]);

    
 let arry =[];
 const {Empty_repo_Array,No_repos} = values

    useEffect(()=>{
        const fetchAsync = async ()=>{
            if(props.repo_link === undefined){
                console.log("no info")
            }
            else{
               await fetch(`${props.repo_link}`)
            .then(data =>{
               /*  console.log(data.type) */
                if(data.type == "cors"){
                   /*  console.log("running"); */
                    return data.json();
                }

             /*   console.log(data)
               console.log(props.repoLink); */
                
            })
            .then(data =>{
                
                
                let arry =[];
                for(let i=0;i<5;i++){
                     arry[i] = data[i];
                    
                }
               
               /*  console.log(arry); */
                
                return arry
                
            })  
            .then(data =>{
                setRepos(data);
                /* console.log(repos); */
            })
            
            .catch(err => console.log(err))
                }
            }
        fetchAsync()   
    },[props.repo_link])
    /* console.log(repos); */
   /*  if( repos[0] == undefined){
        setValues({Empty_repo_Array:true})
    }
   console.log(Empty_repo_Array);
 */
    
    
    return (
        <div>
            {props.showModal ? 
     
                <div>
                <div className="popup-parent" >
                 <div className="popup-item repo_modal">
                  <div className="header">
                    <h2  className="modal_title" >Top Repos </h2>
                    <span className="btn">
                    <button onClick={()=>{props.setTrigger(false)}}>X</button></span>
                  </div>
                  
                  {
                    repos[0] == undefined ?
                    (
                        <div style={{display:'flex',justifyContent:'center'}}><h2>No repos to show</h2></div>): (repos.map(repo => 
                      <div className="RepoModal_container">
                      <div className="RepooModal_item">
                           <a key={repo.id} href={repo.html_url} target="_blank">{repo.name}</a>
                       </div>
                       </div>
                      ))
                      
                   
                }
                
                
                 <div>
                 
                 </div>
                
                 </div>
                 <div className="popup" onClick={()=>{props.setTrigger({viewRepoModal:false})}} ></div>
                 </div>
                 </div>
              :  ""
              }
              </div>
        
    )
}

export default RepoModal
/* 

 {
                      repos == null ?
                      (<h2>No repos to show</h2>): (repos.map(repo => 
                        <div className="RepoModal_container">
                        <div className="RepooModal_item">
                             <a key={repo.id} href={repo.html_url} target="_blank">{repo.name}</a>
                         </div>
                         </div>
                        ))
                        
                     
                  }
                  
*/