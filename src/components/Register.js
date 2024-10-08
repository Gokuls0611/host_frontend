import React, { useState,useEffect } from 'react'
import axios from 'axios'
import {Navbar} from './Navbar'
import { message } from 'antd'
import {  useNavigate } from 'react-router-dom'
import LoadingComponent from './LoadingComponent'
import ButtonLoad from './ButtonLoad'
import './style.css'

export default function Register() {
  const navigate = useNavigate()
  const[user,setUser] = useState(
    {
      name:"",
      email:"",
      password:"",
      retype:"",
    }
  )
  const[load,setLoad] = useState(false)
  const[loading,setLoading] = useState(false)
  const change = e => {
    const { name, value } = e.target
    setUser({
        ...user,
        [name]: value
    })
  }
  const specialCharRegex = /[!@#$%]/;
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const numberRegex = /[0-9]/;


  const submit = (e) => {
    e.preventDefault()
    setLoad(true)
    if( name!=="" && email!=="" && password!=="" && retype!==""){
    if(password!==retype){
        message.warning("Mismatch Password Please Try Again...")
        setLoad(false)
    }
    else if(password.length >= 8 &&
      uppercaseRegex.test(password) &&
      lowercaseRegex.test(password) &&
      numberRegex.test(password) &&
      specialCharRegex.test(password)){

        axios
        .post('https://host-backend-six.vercel.app/register',user)
        .then( res => {
          if(!res.data.Login){
            message.success(res.data.message)
          }
          else{
            message.info(res.data.message)
          }
            navigate('/login')
            setLoad(false)

        })
      .catch(err=>{
              message.warning("Please Try again Later ...")
              setLoad(false)
        })        
    } else {
        message.warning("Enter a Strong Password...")
        setLoad(false)
    }
    
  }
  else{
    message.warning("Please Check all the fields...")
    setLoad(false)
  }
}
useEffect(()=>{
  setLoading(true)
  axios.post('https://host-backend-six.vercel.app/',{t:localStorage.getItem("token")})
  .then(res=>{
    if(res.data.valid){
      navigate('/')
    }
    else{
      navigate('/register')
    }
    setLoading(false)
  })
},[navigate])

  const { name, email, password, retype } = user
  return ( 
    <div>
      {loading?<LoadingComponent/>:
          (<div>
            <header>USER VIEWS</header>
            <div>
                <Navbar/>
                </div>
              <form>
                
              <div className='container'>
              <input  name='name' type='text' value={name} onChange={change} placeholder='Enter Name'></input>
              <input name='email' type='email' value={email} onChange={change} placeholder='Enter E-mail'></input>
              <input name='password' type='password' value={password} onChange={change} placeholder='Enter Password'></input>
              <input name='retype' type='password' value={retype} onChange={change} placeholder='Retype Password'></input>
              </div>
              <div>
              <button type='submit' onClick={submit} disabled={load}>
                  {load?<ButtonLoad/>:<span>Register</span>}
                </button>
              </div>
              </form>
            </div>
          )
      }
    </div>
  )
}
