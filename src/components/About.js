import React, { useEffect } from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { message } from 'antd'

export default function About() {
  const navigate = useNavigate()
  useEffect(()=>{
    console.log("use")
    axios.get('http://localhost:5000/')
    .then(res=>{
      if(!res.data.valid){
        navigate('/login')
        message.info("Please Login before see the page")
      }
    },[navigate])
    .catch(err=>{
      console.log(err)
    })
    //eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  axios.defaults.withCredentials = true
  return (
    <div>

        This is about Page
    </div>
  )
}