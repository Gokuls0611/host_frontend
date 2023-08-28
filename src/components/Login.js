import React, { useState } from 'react'
import axios from 'axios'
import {Navbar} from './Navbar'
import { NavLink } from 'react-router-dom'
import {message} from 'antd'
import { useSignIn } from 'react-auth-kit'
import './style.css'
function Login() {
  const [user, setUser] = useState({
    email:"",
    password:"",
  });
  const {email,password} = user
  const signIn = useSignIn()
  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({
      ...user,
        [name]: value
    })
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/login',user)
      .then(res => {
        if (res.data.loginuser) {
          setTimeout(() => {
            message.success(res.data.message);
          }, 2000);
          signIn({
            token:res.data.user,
            expiresIn:3600,
            tokenType:"Bearer",
            authState:{email:res.data.user.email }
          })
        }
        else{
          message.error(res.data.message)
        }
      }
      )
  };
  return (
    
    <div>
      <header>USER VIEWS
      </header>
      <div>
        <Navbar />
        </div>
      <form>
        <div className='container'>
          <input name='email' type='email' value={email} onChange={handleChange} placeholder='Enter E-mail' />
          <input name='password' type='password' value={password} onChange={handleChange} placeholder='Enter Password' />
        </div>
        <div>
          <input type='submit' value='Login' onClick={handleSubmit} />
        </div>
        <div className='co1'>
        <NavLink style={({color:'azure'})} to='/ForgotPassword'>Forgot Password?</NavLink>
        <NavLink style={({color:'azure'})} to='/home'>Continue as Guest</NavLink>
      </div>
      </form>
      
    </div>
  );
}


export default Login;