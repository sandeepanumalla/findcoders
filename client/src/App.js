import React,{useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Base from './Components/base';
import {BrowserRouter as Router,Route,Switch, Redirect} from 'react-router-dom';
import profile from './Components/profiles';
import PrivateRoutes from './auth_api/ProtectedRoutes';





const App = () =>{
  


  return(

        <Router>
        <Switch>
          <Route exact path="/" component={Base}></Route>
          <PrivateRoutes exact path="/profiles" component={profile}></PrivateRoutes>
          <Redirect to="/"/>
        </Switch>
      </Router>
 
   
  )
}

export default App;
