import React from 'react';
import {Routes,Route} from 'react-router-dom';
import Menu from './components/Menu';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import About from './components/About';
import Placeorder from './components/Placeorder';
import  Cart  from './components/Cart';
import Contact from './components/Contact';
import Pagenotfound from './components/Pagenotfound';
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
      <Route path='/orders' element = {<Placeorder/>}></Route>
      <Route path='/cart'element={<Cart/>}></Route>
      <Route path='/contact' element = {<Contact/>}></Route>
      <Route path="*" element = {<Pagenotfound/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
