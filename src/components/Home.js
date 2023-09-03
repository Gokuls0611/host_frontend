import React,{useState,useEffect} from 'react'
import { NavLink ,useNavigate} from 'react-router-dom'
import axios from 'axios'

export default function Home() {
    const [name,setName] = useState('')
    const navigate = useNavigate()
    useEffect(()=>{
      axios.get('https://proud-puce-springbok.cyclic.app/')
      .then(res=>{
        if(!res.data.valid){
            setName(res.data.user)
        }
      })
      
    },[navigate])
    axios.defaults.withCredentials=true
  return (
    <div>
        <div>Welcome to Home Page {name}</div>
         <NavLink to='/login'>Sign in</NavLink> or <NavLink to='/register'>Sign Up</NavLink> to continue
    </div>
  )
}
