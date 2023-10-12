import React from "react";
import './style.css'
import { NavLink } from "react-router-dom";

export const Navbar =()=>{
    return (
        <div className="loginsignup">
            <NavLink className="nav-link" activeclassname="active" to="/login">Login</NavLink>
            <NavLink className="nav-link" activeclassname="active" to="/register">Sign Up</NavLink>
        </div>
    )
}
export default Navbar