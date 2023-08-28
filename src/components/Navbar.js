import React from "react";
import './style.css'
import { NavLink } from "react-router-dom";

export const Navbar =()=>{
    return (
        <div className="Nav">
            <NavLink className="nav-link" activeclassname="active" to="/">Login</NavLink>
            <NavLink className="nav-link" activeclassname="active" to="/register">Sign Up</NavLink>
        </div>
    )
}
export default Navbar