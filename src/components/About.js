import React, { useEffect } from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { message } from 'antd'

export default function About() {
  const navigate = useNavigate()
  useEffect(()=>{
    console.log("use")
    axios.get('https://proud-puce-springbok.cyclic.app/')
    .then(res=>{
      if(!res.data.valid){
        navigate('/login')
        message.info("Please Login before see the page")
      }
    },[navigate])
    .catch(err=>{
      console.log(err)
    })
  },[])
  axios.defaults.withCredentials = true
  return (
    <div>

        This is about Page
    </div>
  )
}
