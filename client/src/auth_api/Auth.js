
import axios from 'axios';
import base from "../Components/base"
const port = process.env.PORT;
export const BASE_URL = "http://localhost:5001"

console.log("process ",port);
export const signin = user => {
    return fetch(`/api/users/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user) 
    })
    .then(response => {
      console.log(response)
      /* .catch(err =>console.log("eror in signup",err)); */
       
      return response.json();
  
    })
    .catch(err =>console.log("eror in signin",err))
  }
  

export const signup = user => {
  console.log("signup",user);
  return fetch(`/api/users/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  }).then(response => response)
    .catch(err => console.log(err));
};



export const authenticate = (data, next) => {
 
  localStorage.setItem("jwt", JSON.stringify(data));
  console.log("maind data",data)


};


export const signout = next => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
   

    return fetch(`${BASE_URL}/api/users/signout`, {
      method: "GET"
    })
      .then(response => console.log("signout success"))
      .catch(err => console.log(err));
  }
};

export const isAuthenticated = () => {
  /* if (typeof window == "undefined") {
    return false;
  } */
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};




