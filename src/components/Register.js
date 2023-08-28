import React, { useState } from 'react'
import axios from 'axios'
import {Navbar} from './Navbar'
import { message } from 'antd'
import {  useNavigate } from 'react-router-dom'

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
    if(password.length >= 8 &&
      uppercaseRegex.test(password) &&
      lowercaseRegex.test(password) &&
      numberRegex.test(password) &&
      specialCharRegex.test(password)){
    if( name && email && password && (password === retype)){

        axios
        .post('https://proud-puce-springbok.cyclic.app/register',user)
        .then( res => {
            message.success(res.data.message)
            navigate('/')

        })
        
    } else {
        alert("invalid input")
    }
    
  }
  else{
    message.warning("Enter a Strong Password")
  }
}
  const { name, email, password, retype } = user
  return ( 
    <div>
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
        <input  type='submit' value='Sign Up' onClick={submit}></input>
        </div>
        </form>
    </div>
  )
}
