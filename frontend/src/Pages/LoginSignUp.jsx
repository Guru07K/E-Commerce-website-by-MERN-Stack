import React, { useState } from 'react'
import './CSS/LoginSignup.css'

export default function LoginSignUp() {

  const [state, setState]= useState("Login");
  const [formData, setFormData] = useState({
    username:"",
    password:"",
    email:""
  });


 const login = async(req,res)=>{
  console.log("Login",formData);
  let responseData;
  await fetch('http://localhost:4000/login',{
    method:'POST',
    headers:{
      Accept:'application/json',
      'Content-Type':'application/json'
    },
    body:JSON.stringify(formData)
  }).then((res)=>res.json()).then((data)=>{responseData=data})

  if(responseData.success){
    localStorage.setItem('auth-token',responseData.token);
    window.location.replace("/");
  }else{
    alert(responseData.errors)
  }
 }

 const signup = async(req,res)=>{
  console.log("signup",formData);
  let responseData;
  await fetch('http://localhost:4000/signup',{
    method:'POST',
    headers:{
      Accept:'application/json',
      'Content-Type':'application/json'
    },
    body:JSON.stringify(formData)
  }).then((res)=>res.json()).then((data)=>{responseData=data})

  if(responseData.success){
    localStorage.setItem('auth-token',responseData.token);
    window.location.replace("/");
  }else{
    alert(responseData.errors)
  }
 }

const changeHandler = (e)=>{
  setFormData({...formData, [e.target.name]:e.target.value})
}


  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
          <div className="loginsignup-fields">
           {
           state==="Sign Up" ? <input onChange={changeHandler} name='username' value={formData.username} type="text" placeholder="Your Name" ></input>:<></>
           } 
            <input onChange={changeHandler} name='email' value={formData.email} type="email" placeholder="Email" ></input>
            <input onChange={changeHandler} name='password' value={formData.password} type="Password" placeholder="Password" ></input>
          </div>

          <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
          {
            state==="Sign Up" 
            ?
            <p className="loginsignup-login">Already have an account?<span onClick={()=>{setState("Login")}}> Login here</span></p>
            :
            <p className="loginsignup-login">Create an account?<span onClick={()=>{setState("Sign Up")}}> Click here</span></p>
          }
          <div className="loginsignup-agree">
            <input type="checkbox" name="" id="" />
            <p>by continuing, I agree to the terms of use & privacy policy</p>
          </div>
      </div>
    </div>
  )
}
