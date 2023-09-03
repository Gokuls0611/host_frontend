import React from 'react'
import './style.css'
import { useLocation } from 'react-router-dom'

export default function Pagenotfound() {
    var l = useLocation()
    console.log(l)
  return (
    <div>
        <h3>Server 404</h3>
        <p>Page Not Found</p>
        
    </div>
    
  )
}
