import React,{useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Base from './Components/base';
import {BrowserRouter as Router,Route,Switch, Redirect} from 'react-router-dom';
import profile from './Components/profiles';
import { isAuthenticated } from './auth_api/Auth';
import { createStore } from 'redux';
import { Provider } from 'react-redux';



const App = () =>{
  


  return(

        <Router>
        <Route exact path="/home" component={Base}></Route>
        <Route exact path="/profiles" component={profile}></Route>
        <Redirect path="/home" />
      </Router>
 
   
  )
}

export default App;
