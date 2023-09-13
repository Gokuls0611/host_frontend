import React, { useEffect ,useState} from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { message } from 'antd'
import Login from './Login'
import {CircularProgress} from '@material-ui/core'
import './style.css'


export default function About() {
  const navigate = useNavigate()
  const [valid,setValid] = useState(false)
  const [loading,setLoading] = useState(false);

  useEffect(()=>{
    setTimeout(()=>{
      setLoading(true)
    },400000)
    console.log("use",valid)
   axios.get('http://localhost:5000/')
    .then(res=>{
        setValid(res.data.valid)  
        if(!valid){
          message.info("Please Login before see the page")
        }  
    },[navigate,valid,loading])
    .catch(err=>{
      console.log(err)
    })
    //eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  axios.defaults.withCredentials = true
  return (
    
    <div>
      
      {
        !loading?(<div className='loading'><CircularProgress/></div>):(  
          console.log(valid),
          valid?(<>This is about Page</>):(<Login/>)
        )
      }

        
    </div>
  )
}
