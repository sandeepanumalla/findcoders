import React from 'react';
import { Redirect } from 'react-router-dom';
import Nav from './nav';
import './profile.css';
import{isAuthenticated} from '../auth_api/Auth'
import { useState,useEffect } from 'react';

import { connect, useDispatch, useSelector } from 'react-redux';
import  { fetchCheckProfiles } from '../actions';
import deleteProfile from '../profile_api/deleteProfile';
import { deleteProfileFromStore } from '../actions/deleteAction';
import { bindActionCreators } from 'redux';




const Profiles = ({fetchCheckProfiles,profiles}) => {

const[items,setItems] = useState({
  check_profiles:[]
})

const {check_profiles} = items;

useEffect(() =>{
  fetchCheckProfiles();
},[])
const dispatch = useDispatch();

console.log("checkprofiles",check_profiles)

const removeUser = (login_name) => {
  console.log("removeUser",login_name);
deleteProfile({login_name})
.then(response =>{
  
  if(response.status === 200){
    console.log("running")
  dispatch(deleteProfileFromStore(login_name));
  }})
.catch(err =>console.error(err))


}

    return (
        
        <div>
            <Nav></Nav>
            <div className="main_container">
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
            </div>
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

