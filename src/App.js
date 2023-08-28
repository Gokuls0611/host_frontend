import Register from './components/Register';
import Login from './components/Login';
import {Routes,Route} from 'react-router-dom';
import Home from './components/Home';
import ForgotPassword from './components/ForgotPassword';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route exact path='/' element={<Login/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/home'>Contine as Guest</Route>
      <Route path='/ForgotPassword' element={<ForgotPassword/>}></Route>
      </Routes> 
    </div>
  );
}

export default App;
