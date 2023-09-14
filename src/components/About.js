import React, { useEffect ,useState} from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { message } from 'antd'
import Login from './Login'
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

    console.log("use")
    axios.get('https://proud-puce-springbok.cyclic.app/')

    .then(res=>{
        setValid(res.data.valid)  
        if(!valid){
          message.info("Please Login before see the page")
        }  
    },[navigate,valid,loading])
    .catch(err=>{
      console.log(err)
    })
  },[])
  axios.defaults.withCredentials = true
  return (
    
    <div>
      
      {
        !loading?(<div className='loading'>Loading</div>):(  
          console.log(valid),
          valid?(<>This is about Page</>):(<Login/>)
        )
      }

        
    </div>
  )
}
