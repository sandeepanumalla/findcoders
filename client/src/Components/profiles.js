import React from 'react';
import { Redirect } from 'react-router-dom';
import Nav from './nav';
import './profile.css';
import{isAuthenticated} from '../auth_api/Auth'
import { useState,useEffect } from 'react';

import { connect, useDispatch, useSelector, useStore } from 'react-redux';
import  { fetchCheckProfiles } from '../actions';
import deleteProfile from '../profile_api/deleteProfile';
import { deleteProfileFromStore } from '../actions/deleteAction';
import { bindActionCreators } from 'redux';
import { Space, Table, Tabs } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';




const Profiles = ({fetchCheckProfiles,profiles}) => {

const[items,setItems] = useState({
  check_profiles:[]
})




const dispatch = useDispatch();
const {check_profiles} = items;

useEffect(() =>{

  fetchCheckProfiles()
  
},[])



const removeUser = (login_name) => {
  /* console.log("removeUser",login_name); */
deleteProfile({login_name})
.then(response =>{
  
  if(response.status === 200){
    /* console.log("running") */
  dispatch(deleteProfileFromStore(login_name));
  }})
.catch(err =>console.error(err))


}

    return (
        
        <div>
            <Nav></Nav>
            {
              profiles != null ?
              (<div>
              <div className="main_container">
                <div className="title_header">
                <h1  className="title">Saved Profiles</h1>
                </div>
                <table class="table">
                <thead>
                  <tr className="theader">
                   
                    <th scope="col"><h3>Name</h3></th>
                
                    <th scope="col"><h3>Action</h3></th>
                  </tr>
                </thead>
                <tbody>
                
                { 
                  
                  
                    profiles.map(profile =>{
                      return <tr>
                      
                      <td><p className="t_body">{profile.login_name}</p></td>
                      <td className="td_delete"><span className="t_body"><DeleteTwoTone onClick={()=>{removeUser(profile.login_name)}}/></span></td>
                      
                    </tr>
                    })
                  }

                   
                </tbody>
              </table>
          </div>
          </div>)
        : 
        <h2>No saved profiles</h2>
        }
        </div>
    )
}

const mapStateToProps = state =>{
  return{profiles:state.profiles}
}

const mapDispatchToProps = dispatch =>{
  return {
    fetchCheckProfiles:()=>{dispatch(fetchCheckProfiles())},
    deleteProfileFromStore:()=>dispatch(deleteProfileFromStore())} 
  }


export default connect(mapStateToProps,mapDispatchToProps)(Profiles);




/* 
 <div className="table_body" >
                {
                  profiles.map(profile => <div className="sub_container">
                    <div className="profile_item">
                      <p>{profile.login_name}</p>
                      <DeleteTwoTone onClick={()=>{removeUser(profile.login_name)}}/>
                      
                    </div>
                  </div>
                  )   
              }
              </div>
*/


/* 

<div className="profile_container">
              <div className="title_header">
                <h1  className="title">Saved Profiles</h1>
              </div>
              {
                profiles.map(profile => <div className="sub_container">
                  <div className="profile_item">
                    <p>{profile.login_name}</p>
                    <button onClick={()=>{removeUser(profile.login_name)}} >Remove</button>
                  </div>
                </div>
                )   
            }
            </div>
*/

/* 

<table  className="table_container">
            <thead  >
              <div className="table_head">
                <tr>
                <th>Name</th>
                <th>Action</th>
              </tr>
              </div>
              
            </thead>
            <div className="table_body">
              <tbody >
              {
                profiles.map(profile =>{
                  return <tr>
                            <td>{profile.login_name}</td>
                            <td>Delete</td>
                          </tr>
                })
              }
            </tbody>
            </div>
            
            
          </table>
*/


/* 


*/