import React, { useEffect, useState } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';
import Login from './Login';
import './style.css';
import LoadingComponent from './LoadingComponent';

export default function About() {
  const navigate = useNavigate();
  const [valid, setValid] = useState(false);
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 6000);

    axios.get('http://localhost:5000/')
      .then(res => {
        setValid(res.data.valid);
        if(!res.data.valid){
          message.info(res.data.message);
        }
        console.log(valid, "res");
      })
      .catch(err => {
        console.log(err);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate,valid]);

  axios.defaults.withCredentials = true;
  

  return (
    <div>
      {!loading && !valid ? (
        <LoadingComponent/>
      ) : valid ? (
        <>
        <section className="skills">
        <h2>Skills</h2>
        <ul>
          <li>JavaScript</li>
          <li>React</li>
          <li>Node.js</li>
          <li>HTML / CSS</li>
          <li>SQL</li>
        </ul>
        </section>
        </>
      ) : <Login/>}
    </div>
  );
}
