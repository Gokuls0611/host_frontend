import React from 'react'
import { NavLink } from 'react-router-dom'
import './style.css'

export default function Home() {
  return (
    <div>
        <div className="navbar">
        <ul className="navbar-links">
            <li><NavLink to='/home' className="navbar-link">Home</NavLink></li>
            <li><NavLink to ='/about' className="navbar-link">About</NavLink></li>
            <li><NavLink to='/services' className="navbar-link">Services</NavLink></li>
            <li><NavLink to='/contact' className="navbar-link">Contact</NavLink></li>
        </ul>
    </div>

        <div>Welcome to Home Page</div>
         <NavLink to='/'>Sign in</NavLink> or <NavLink to='/register'>Sign Up</NavLink> to continue


    </div>
    
  )
}
