// Page2.js
import React, { useEffect ,useState} from 'react';
import axios from 'axios';
import LoadingComponent from './LoadingComponent';
import {message} from 'antd'
import './cart.css'
import { useNavigate, NavLink } from 'react-router-dom';

function Cart() {
  const [cart, setCart] = useState([]);
  const [cost,setCost] = useState([]);
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  useEffect(()=>{
    const c = sessionStorage.getItem('cart')
    const par = JSON.parse(c)
    setCart(par)
    axios.get("https://host-backend-six.vercel.app/products")
      .then((response) => {
        const data = response.data.map(item => ({ id: item.id, price: item.price }))
        setCost(data)
      })
      .catch((error) => {
        console.error('Error fetching file:', error);
      });  
      setTimeout(()=>{
        setLoading(true)
      },1000)
  },[])

  const addToCart=(product)=>{
      product.quantity =product.quantity+1
      const priceid = cost.filter((item)=>item.id===product.id)
      const cp = (product.quantity)*priceid[0].price
      setCart(cart.map((item)=>item.id === product.id ? { ...item,name:item.name, quantity:product.quantity ,price:cp} : item))
      
  }
  const removeFromCart = (product) => {
    const priceid = cost.filter((item)=>item.id===product.id)
    const cp = (product.quantity-1)*priceid[0].price
    const updatedCart = cart.map((item) =>
      item.id === product.id
        ? { ...item,name:product.name, quantity: item.quantity - 1,price:cp }
        : item
    );
    setCart( updatedCart.filter((item) => item.quantity > 0));
    
  };

  useEffect(()=>{
    sessionStorage.setItem("cart",JSON.stringify(cart))
  })

const grandTotal = cart.reduce(
  (total, item) => total +item.price,
  0
);

const placeorder=()=>(
    axios.post("https://host-backend-six.vercel.app/",{t:localStorage.getItem('token')})
    .then(res=>{
      if(res.data.valid){
      axios.post('https://host-backend-six.vercel.app/placeorders',{cart:cart,t:localStorage.getItem('token')})
      .then(res=>{
        message.info(res.data.message)
        navigate('/')
      })
      setCart([]);
    }else{
      message.info("Login to Continue")
      navigate('/login')
    }
    })
    
)

  return (
    <div className='mtop'>
      <h1>Cart</h1>
      {loading?(
        cart.length===0?
        (<div>
          <p>No Products Selected</p>
          <div>
          <footer><NavLink to='/'>Return to HomePage</NavLink></footer>
          </div>
          </div>
        )
        :
        <div className='cart_container'>
          <div className='po'>
          <table className='layout'>
            <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
          </thead>
          <tbody>
        {cart.map((item,index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td className='cart-item-count'>
            <p>
            <input type="submit" value="+" onClick={() => addToCart(item)}/>
            {item.quantity}
            <input type="submit" value="-" onClick={() => removeFromCart(item)}/>
            </p> 
            </td>
            <td>{item.price}</td>
          </tr>
          ))
        }
        </tbody>
        </table>
        </div>
          <div className='total'>
          Total:{grandTotal}
          </div>
          <div>
          <button className='placeOrder' onClick={placeorder}>Place Order</button>
          </div>
         
          </div>
      ):(<LoadingComponent/>) 
    }
    </div>
    
  );
}

export default Cart;
