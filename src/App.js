import React from 'react';
import Register from './components/Register';
import Login from './components/Login';
import {Routes,Route} from 'react-router-dom';
import Menu from './components/Menu';
import Home from './components/Home';
import ForgotPassword from './components/ForgotPassword';
import About from './components/About';
import Service from './components/Service';
import  Cart  from './components/Cart';
import Pagenotfound from './components/Pagenotfound';
import Contact from './components/Contact';
import './App.css';
import './components/style.css'
function App() {
  return (
    <div className="App">
      <div><Menu/></div>
      <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element= {<Register/>}></Route>
      <Route path='/ForgotPassword' element={<ForgotPassword/>}></Route>
      <Route path='/about' element = {<About/>}></Route>
      <Route path='/services' element = {<Service/>}></Route>
      <Route path='/contact' element = {<Contact/>}></Route>
      <Route path="*" element = {<Pagenotfound/>}></Route>
      <Route path='/cart'element={<Cart/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
