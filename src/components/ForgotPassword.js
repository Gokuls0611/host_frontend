import React,{useState} from 'react'
import axios from 'axios'   
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import ButtonLoad from './ButtonLoad'
import './fp.css'

export default function ForgotPassword() {
    const navigate = useNavigate()
    const [load,setLoad] = useState(false)

  const[user,setUser] = useState(
    {
      email:"",
      password:"",
      otp:"",
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
    setLoad(true)
    if(password.length >= 8 &&
      uppercaseRegex.test(password) &&
      lowercaseRegex.test(password) &&
      numberRegex.test(password) &&
      specialCharRegex.test(password)){
    if((password === retype)){

        axios
        .post('https://drab-plum-kangaroo-tutu.cyclic.app/setPassword',{email,password})
        .then( res => {
            message.info(res.data.message)
            navigate('/login')
            setLoad(false)
        })
        
    } else {
        message.error("Mismatch Password")
        setLoad(false)
    }
    
  }
  else{
    message.warning("Enter a Strong Password")
    setLoad(false)
  }
}


const getotp = async(e) =>{
  e.preventDefault()
  setLoad(true)
      await axios.post('https://host-email.onrender.com/forgotPassword',{email})
      .then(res => {
          if(res.data.b){
          message.info(res.data.message)
          setDisplay({e:!display.e,o:!display.o})
          }
          else{
            message.error(res.data.message)
          }
          setLoad(false)
      })
}


const verify = (e) => {
  e.preventDefault()
  setLoad(true)
      axios.post("https://drab-plum-kangaroo-tutu.cyclic.app/verifyotp",{email:email,otp:otp})
      .then((res)=>{
        if(res.data.verify){
          message.success(res.data.message)
          setDisplay({o:!display.o,p:!display.p})
        }
        else{
          message.info(res.data.message)
        }
        setLoad(false)
      })
}
  const { email, password, retype ,otp} = user
  
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
          <button type='submit' onClick={getotp} disabled={load}>
            {load?<ButtonLoad/>:<span>Get OTP</span>}
          </button>
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
                <button type='submit' onClick={verify} disabled={load}>
                  {load?<ButtonLoad/>:<span>Verify</span>}
                </button>
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
                <button type='submit' onClick={submit} disabled={load}>
                  {load?<ButtonLoad/>:<span>SUBMIT</span>}
                </button>
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
