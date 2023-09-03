import { useNavigate } from 'react-router-dom'
import { message } from 'antd'
import axios from 'axios'

export default function Logout() {
    const navigate = useNavigate()
    const logout=()=>{
        axios.get("https://proud-puce-springbok.cyclic.app/logout")
        .then(res=>{
          navigate('/')
          message.success("Logged Out Successully")
          message.success(res)
        })
        
    }
  return (
       logout
  )
}
