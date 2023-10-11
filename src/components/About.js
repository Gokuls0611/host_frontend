import React, { useEffect, useState } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css';
import LoadingComponent from './LoadingComponent';

export default function About() {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    
  }, [navigate]);

  axios.defaults.withCredentials = true;
  
  return (
    
    <div>
      {loading? (
        <LoadingComponent/>
      ) :( 
        <div>
        <div>
          <h1>About Website</h1>
          <div className='ab'>
          <div className='about'>
          <h2>
            Frontend
          </h2>
          <p>Frontend Framework and Languages: JavaScript , React and CSS<br/>
          Hosting : Hosted the FrontEnd Using <a href='https://vercel.com/'>Vercel App</a>.</p>
          </div>
          <div className='about'>
          <h2>
            Backend
          </h2>
          <p>Backend Languages and Frameworks: JavaScript ,Node ,Express<br/>
          Database for Backend : MongoDB Atlas<br/>
          Hosting : Hosted the Backend using <a href='https://www.cyclic.sh/'>cyclic Deployment</a> and <a href='https://render.com/'>Render</a> for sending mails. (Sending mails is through hosting is premium in most hosting Website.)   
          </p>
          </div>
          </div>
        </div>
        </div>
        )
      }
      </div>
  )
}