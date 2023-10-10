import React, { useEffect, useState } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import './style.css';
import LoadingComponent from './LoadingComponent';

export default function About() {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(true);
  useEffect(() => {
      setTimeout(()=>{
        setLoading(false)
      },1000)
  }, [navigate]);

  
  return (
    
    <div>
      {loading? (
        <LoadingComponent/>
      ):(
        <>
        <div className='resume' >
          <div className="photo">
          {/* <div>
          <img src={image} alt='img.png' height="200px" width="200px" />
          </div> */}
          <div className='namedeg'>
          <h2 className='name'>Gokul S</h2>
          <p>BE Computer Science and Engineering</p>
          </div>
          </div>
        <section className="careerobj">
          <div className='ml-obj'>Career Objective</div>
          <div className='ml'>
          To expand my learnings, knowledge, and skills. 
          Secure a responsible career opportunity to fully utilize my training and skills, while making a significant contribution to the success of the company.
          </div>
        </section>
        <section className="careerobj">
          <div className='ml-obj'>Education</div>
          <div style={{whiteSpace:"pre"}}   >
            <h2>
            Bachelor of Science in Computer Science
            Kongu Engineering College - Erode
            </h2>
          </div>
        </section>
        
        </div>
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
      )}
    </div>
  );
}
