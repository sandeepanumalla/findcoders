import React,{useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Base from './Components/base';
import {BrowserRouter as Router,Route,Switch, Redirect} from 'react-router-dom';
import profile from './Components/profiles';

import protectedRoutes from './protectedRoutes';



const App = () =>{
  


  return(

        <Router>
        <Route exact path="/home" component={Base}></Route>
        <Route exact path="/profiles" component={profile}></Route>
        <Redirect to="/home" />
      </Router>
 
   
  )
}

export default App;
