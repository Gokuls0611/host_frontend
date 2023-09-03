import { message } from 'antd'
import React ,{useEffect, useState} from 'react'
import { NavLink,useNavigate} from 'react-router-dom'
import axios from 'axios'
import './style.css'


export default function Menu() {
  const [auth,setAuth] = useState(false)
  const navigate = useNavigate()
    useEffect(()=>{
      axios.get('http://localhost:5000/')
      .then(res=>{
        if(res.data.valid){
            setAuth(res.data.valid)
        }
        else{
          setAuth(res.data.valid)
        }
      })
      
    },[navigate,auth])
    axios.defaults.withCredentials=true

    const logout =()=>{
      axios.get('http://localhost:5000/logout')
      .then(res=>{
        if(res.data.valid){
          setAuth(false)
          localStorage.clear('token')
          // window.location.reload(true)
          navigate('/')
          setTimeout(()=>{
            message.info(res.data.message)
          },2000)
          
        }
      })
    }
  return (
    <div>
        <div className="navbar">
        <ul className="navbar-links">
            <li><NavLink to='/' className="navbar-link">Home</NavLink></li>
            <li><NavLink to ='/about' className="navbar-link">About</NavLink></li>
            <li><NavLink to='/services' className="navbar-link">Services</NavLink></li>
            <li><NavLink to='/contact' className="navbar-link">Contact</NavLink></li>
        </ul>
        {
          auth?
        <div onClick={logout} className="navbar-link">Logout</div>
        :
        <NavLink to='/login' className="navbar-link">Login</NavLink>
        }
    </div>
    </div>
    
  )
}