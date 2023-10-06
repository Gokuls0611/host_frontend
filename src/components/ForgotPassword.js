import React,{useState} from 'react'
import axios from 'axios'   
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import './fp.css'

export default function ForgotPassword() {
    const navigate = useNavigate()
  const[user,setUser] = useState(
    {
      email:"",
      password:"",
      otp:"",
      votp:"",
      retype:""
    }
  )
  const [display,setDisplay]=useState({
    e:true,
    o:false,
    p:false,
})

  const change = e => {
    const { name, value } = e.target
    setUser({
        ...user,
        [name]: value
    })
  }
  const specialCharRegex = /[!@#$%]/;
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const numberRegex = /[0-9]/;
  const submit = (e) => {
    e.preventDefault()
    if(password.length >= 8 &&
      uppercaseRegex.test(password) &&
      lowercaseRegex.test(password) &&
      numberRegex.test(password) &&
      specialCharRegex.test(password)){
    if((password === retype)){

        axios
        .post('https://wild-teal-basket-clam-fez.cyclic.cloud/setPassword',{email,password})
        .then( res => {
            message.info(res.data.message)
            navigate('/')
        })
        
    } else {
        message.error("Wrong Password")
    }
    
  }
  else{
    message.warning("Enter a Strong Password")
  }
}


const getotp = (e) => {
  e.preventDefault()
      axios
      .post('https://wild-teal-basket-clam-fez.cyclic.cloud/forgotPassword',{email})
      .then( res => {
          if(res.data.b){
          message.info(res.data.message)
          setDisplay({
            e:!display.e,o:!display.o})
            setUser({
              ...user,
              votp:res.data.otp
            })
          }
          else{
            message.error(res.data.message)
          }
      })
}

const verify = (e) => {
  e.preventDefault()
      if(parseInt(votp) === parseInt(otp)){
        message.success("OTP verified Successfully")
        setUser({...user,votp:""})
        setDisplay({o:!display.o,p:!display.p})
      } 
      else{
        message.error("Invalid or Expired OTP")
      }
}
  const { email, password, retype ,otp ,votp} = user
  
    return (
    <div>
        <header>
            Set Password
        </header>
        <div>
        <form>
          <>
        <div className='container'>
        {
          display.e && (
          <>
          <input name='email' type='email' value={email} onChange={change} placeholder='Enter E-mail'></input>
          <div>
          <input  type='submit' value='Get OTP' onClick={getotp}></input>
          </div>
          </>
          )
        } 
        {
          display.o &&
            (
              <>
                <input name='otp' type='text' value={otp} onChange={change} placeholder='Enter OTP'></input>
                <div>
                <input  type='submit' value="Submit" onClick={verify}></input>
                </div>
              </>
            )
        }
        {
          display.p &&
            (
              <>
                <input name='password' type='password' value={password} onChange={change} placeholder='Enter Password'></input>
                <input name='retype' type='password' value={retype} onChange={change} placeholder='Retype Password'></input>
                <div>
                <input  type='submit' value='SUBMIT' onClick={submit}></input>
                </div>
              </>
            )
        }
        </div>
        </>
        </form>
        </div>
    </div>
    )
}
