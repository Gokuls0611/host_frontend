import React, { useState ,useEffect} from 'react'
import axios from 'axios'
import {Navbar} from './Navbar'
import { NavLink ,useNavigate} from 'react-router-dom'
import {TailSpin} from 'react-loader-spinner'
import {message} from 'antd'
import './style.css'
function Login() {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    email:"",
    password:"",
  });
  const [load,setLoad] = useState(false)
   useEffect(() => {
     setTimeout(()=>{
      <TailSpin
      color="#00BFFF"
      height={100}
      width={100}
    />
    },4000)
    axios.post('https://backend-kdfp.onrender.com/',{t:localStorage.getItem("token")})
    .then(res=>{
      if(res.data.valid){
        navigate('/')
      }
      else{
        navigate('/login')
      }
    })
  }, [navigate]);
  axios.defaults.withCredentials=true
  
  const {email,password} = user
  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({
      ...user,
        [name]: value
    })
  };
  const handleSubmit = (e) => {
    setLoad(true)
    e.preventDefault();
    axios.post('https://backend-kdfp.onrender.com/login',user)
      .then(res => {
        if (res.data.Login) {
          localStorage.setItem("token",res.data.token)
          message.success(res.data.message);
          navigate('/')
       }
        else{
          message.error(res.data.message)
        }
        setLoad(false)
      }
      )
  };
  return (
    
    <div>
      <header>USER VIEWS
      </header>
      <div>
        <Navbar />
        </div>
      <form>
        <div className='container'>
          <input name='email' type='email' value={email} onChange={handleChange} placeholder='Enter E-mail' />
          <input name='password' type='password' value={password} onChange={handleChange} placeholder='Enter Password' />
        </div>
        <div>
          <button type='submit' onClick={handleSubmit} disabled={load}>
            {load?<ButtonLoad/>:<span>Login</span>}
          </button>
        </div>
        <div className='co1'>
        <NavLink style={({color:'azure'})} to='/ForgotPassword'>Forgot Password?</NavLink>
        <NavLink style={({color:'azure'})} to='/'>Continue as Guest</NavLink>
      </div>
      </form>
      
    </div>
  );
}


export default Login;
