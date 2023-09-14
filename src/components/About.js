import React, { useEffect ,useState} from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { message } from 'antd'
import Login from './Login'
import {TailSpin} from 'react-loader-spinner'
import './style.css'


export default function About() {
  const navigate = useNavigate()
  const [valid,setValid] = useState(false)
  const [loading,setLoading] = useState(false);

  useEffect(()=>{

    setTimeout(()=>{
      setLoading(true)
    },3000)
    axios.get('https://proud-puce-springbok.cyclic.app/')
    .then(res => {
        setValid(res.data.valid);
        if(!res.data.valid){
          showMessage()
        }
        console.log(valid, "res");
      })
      .catch(err => {
        console.log(err);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[navigate])
  function showMessage() {
    message.info("Please Login before seeing the page");
  }
  axios.defaults.withCredentials = true
  return (
    
    <div>
      
      {
        !loading?(<div className='loading'>
        <TailSpin
        color="#00BFFF"
        height={100}
        width={100}
      />
        </div>):(  
          console.log(valid),
          valid?(<>This is about Page</>):(<Login/>)
        )
      }

        
    </div>
  )
}
