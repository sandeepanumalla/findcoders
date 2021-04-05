import React,{Fragment, useState, useEffect} from 'react'
import './Results.css';

import RepoModalBox from './Modals/RepoModal';
import {isAuthenticated} from '../auth_api/Auth';
import AddProfile from '../profile_api/profile';
import AddProfilesAL from './Modals/AddProfilesAL';
import CheckProfiles from '../profile_api/AddedProfile';
import { connect } from 'react-redux';
import { fetchCheckProfiles } from '../actions';



function Results({profiles,fetchCheckProfiles,props,data, loginname,loadingProps,errorProps,repoUrl,initial }) {
    const [Items,setItems] = useState({
        liked:"",
        disliked:"",
        repo_data:[],
        Added:false,
        viewRepoModal:false,
        askLogin:false,
        data_login_name:"",
        effect:"",
        already:true
    })

    

const {effect,data_login_name,check_profiles,already,Added,askLogin,addprofile_login,repo_data,viewRepoModal} = Items;

console.log("repourl",repoUrl);



console.log("error props in ",errorProps);

const openModal =()=>{
    setItems({viewRepoModal:true,effect:"open"});
}

console.log("effect",effect);

/* console.log("props set",props.setTriggerItem); */

useEffect(() => {
    fetchCheckProfiles()
 },[data])


const {user} = isAuthenticated();
const addUserOnCLick =async (a,b,c,d)=>{
    if(!isAuthenticated()){   
        console.log("running")
        setItems({askLogin:true});
    }
    else{
       
        const login_name = a;
        const url = b;
        const avatar_url = c;
        const repos_url = d;
        AddProfile({login_name,url,avatar_url,repos_url})
        .then((e)=> e.json())
        .then(data =>{console.log(data)
            if(data === "Added profile successfully with status 200"){
                setItems({Added:true});
            
            }}
        )
        .catch(err => console.log(err)
        )
        console.log("data in results",a,addprofile_login);
    }
}

console.log(viewRepoModal);

console.log(repoUrl);
console.log(data);
console.log("profileReducer",profiles);


    const [info, setInfo] = useState([]);
   
    return (
        <div >
   
            <div className="container">
            {
                loadingProps ? (
                    <div key={11}><h2 key={12} >Loading..</h2></div>
                ) :errorProps ?
                (<div key={22} ><h2 key={23} >Not Found</h2></div>)
                : initial ?
                (<div key={33} >
                <h2 key={34} >Please Search</h2>
                </div>
                
                )
                :
                 (data.map(data =>{
                     return (<div key={data.id} className="item_container">
                           <h3 key={1} className="profile_name">{data.login}</h3>
                            <img className="image_container" onClick={()=>console.log("checkprofiles",check_profiles)} src={data.avatar_url}></img>
                            <div key={2} >
                            <button className="repo" onClick={()=>{openModal()}} >
                            <svg class="octicon octicon-repo UnderlineNav-octicon hide-sm" height="16" viewBox="0 0 16 16" 
                            version="1.1" width="16" aria-hidden="true">
                            <path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0
                             01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 
                             01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 
                             12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0
                              00-.25-.25h-3.5a.25.25 0 00-.25.25z">
                              </path>
                              </svg> Repositories
                              </button>
                            
                            </div>
                            <div key={3} className="like_container">
                            
                            {
                               
                                Added || profiles.some(item => item.login_name == data.login) ? 
                                    (<button key={4} disabled={true} className="add_btn" 
                                    onClick={()=>addUserOnCLick(data.login,data.url,data.avatar_url,data.repos_url)} >
                                    User Added</button>) :
                                       (<button key={4} className="add_btn"
                                       onClick={()=>addUserOnCLick(data.login,data.url,data.avatar_url,data.repos_url)} >
                                       Add User</button>)
                           
                              }
                            </div>
                            
                           </div>
                           
                          )
                 }))
                }
                <div>
                
                <RepoModalBox  showModal={viewRepoModal} 
                            setTrigger={setItems} repoLink={repoUrl}></RepoModalBox>
    
                            
                <AddProfilesAL setTrigger={setItems} modal={askLogin} ></AddProfilesAL>
                            
                </div>

            </div>
                
        </div>
        
    )
}


const mapStateToProps = (state) =>{
    return {profiles: state.profiles};
}

const mapDispatchToProps = (dispatch) =>{
    return {fetchCheckProfiles:() =>dispatch(fetchCheckProfiles())};
}
export default connect(mapStateToProps,mapDispatchToProps)(Results)
/* 

{
    Added ? (<button key={4} disabled={true} className="add_btn" 
    onClick={()=>addUserOnCLick(data.login,data.url,data.avatar_url,data.repos_url)} >
    User Added</button>) :<button key={4} className="add_btn"
     onClick={()=>addUserOnCLick(data.login,data.url,data.avatar_url,data.repos_url)} >
     Add User</button>

} 

 <div key={3} className="like_container">
                            
                            {
                               
                                 Added || check_profiles.some(item => item.login_name === data.login) ? 
                                     (<button key={4} disabled={true} className="add_btn" 
                                     onClick={()=>addUserOnCLick(data.login,data.url,data.avatar_url,data.repos_url)} >
                                     User Added</button>) :
                                        (<button key={4} className="add_btn"
                                        onClick={()=>addUserOnCLick(data.login,data.url,data.avatar_url,data.repos_url)} >
                                        Add User</button>)
                            
                            }
                            </div>

*/


/* 
{
                               
                                 Added || check_profiles.some(item => item.login_name === data.login) ? 
                                     (<button key={4} disabled={true} className="add_btn" 
                                     onClick={()=>addUserOnCLick(data.login,data.url,data.avatar_url,data.repos_url)} >
                                     User Added</button>) :
                                        (<button key={4} className="add_btn"
                                        onClick={()=>addUserOnCLick(data.login,data.url,data.avatar_url,data.repos_url)} >
                                        Add User</button>)
                            
}
*/

/* 
<div className="container">
            {
                loadingProps ? (
                    <div key={11}><h2 key={12} >Loading..</h2></div>
                ) :errorProps ?
                (<div key={22} ><h2 key={23} >Not Found</h2></div>)
                : initial ?
                (<div key={33} >
                <h2 key={34} >Please Search</h2>
                </div>
                
                )
                :
                 (data.map(data =>{
                     return (<div key={data.id} className="item_container">
                           <h3 key={1} className="profile_name">{data.login}</h3>
                            <img className="image_container" src={data.avatar_url}></img>
                            <div key={2} >
                            <button className="repo" onClick={()=>{openModal()}} >
                            <svg class="octicon octicon-repo UnderlineNav-octicon hide-sm" height="16" viewBox="0 0 16 16" 
                            version="1.1" width="16" aria-hidden="true">
                            <path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0
                             01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 
                             01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 
                             12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0
                              00-.25-.25h-3.5a.25.25 0 00-.25.25z">
                              </path>
                              </svg> Repositories
                              </button>
                            
                            </div>
                            <div key={3} className="like_container">
                            
                            {
                               
                                 Added || check_profiles.some(item => item.login_name === data.login) ? 
                                     (<button key={4} disabled={true} className="add_btn" 
                                     onClick={()=>addUserOnCLick(data.login,data.url,data.avatar_url,data.repos_url)} >
                                     User Added</button>) :
                                        (<button key={4} className="add_btn"
                                        onClick={()=>addUserOnCLick(data.login,data.url,data.avatar_url,data.repos_url)} >
                                        Add User</button>)
                            
                            }
                            </div>
                            
                           </div>
                           
                          )
                 }))
                }
                <div>
                
                <RepoModalBox  showModal={viewRepoModal} 
                            setTrigger={setItems} repoLink={repoUrl}></RepoModalBox>
                            <AddProfilesAL setTrigger={setItems} modal={askLogin} ></AddProfilesAL>
                            
                </div>

            </div>
            
*/

/* 
useEffect(() => {

    const run = async()=>{
     CheckProfiles()
     .then(response=>{
 
       return response.json()
     })
     .then(data =>
         {
             console.log(data.length);
             setItems({check_profiles:data});
             console.log(data)
     })
     .catch(err => console.log(err));

    }

    run();
 },[data])
*/