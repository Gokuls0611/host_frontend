import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css'
import carticon from './cart icon.png'
import LoadingComponent from './LoadingComponent';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [jsonData, setJsonData] = useState([]);
  const [value,setValue] = useState("");
  const [cart, setCart] = useState([]);
  const [load,setLoad] = useState(true)
  const [options,setOptions] = useState("")
  const navigate = useNavigate()
  const addToCart = (product) => {
     product.qty = product.qty+1
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item,name:product.name, quantity: item.quantity + 1 ,price:product.price*(item.quantity+1)} : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, {id:product.id,name:product.name,quantity: 1,price:product.price}]);
    }
    
  };
  const removeFromCart = (product) => {
    if(product.qty>0){
      product.qty = product.qty-1
    }
    const updatedCart = cart.map((item) =>
      item.id === product.id
        ? { ...item,name:product.name, quantity: item.quantity - 1,price:product.price*(item.quantity-1) }
        : item
    );
    setCart( updatedCart.filter((item) => item.quantity > 0));
  };
  

  useEffect(() => {
    axios.get("https://drab-plum-kangaroo-tutu.cyclic.app/products")
      .then((response) => {
        const data = response.data;
        setJsonData(data);
        setLoad(false)
      })
      .catch((error) => {
        console.error('Error fetching file:', error);
      });

  }, []);

useEffect(()=>{
  const c =  sessionStorage.getItem("cart");
  if(c===null || c===[]){
      const par = []
      setCart(par);
    }
    else{
      const par = JSON.parse(c)
      setCart(Array.from(
        new Map(par.map((item) => [item.id, item])).values()))
    }
},[])
 
  useEffect(()=>{
    if(cart!=null){
    sessionStorage.setItem("cart",JSON.stringify(cart))
    }
    else{
      sessionStorage.setItem("cart",JSON.stringify([]))
    }
  })
  const D =
    jsonData
    .filter((item) =>
        options===""?item.name.toLowerCase().includes(value.toLowerCase()):item.category === options && item.name.toLowerCase().includes(value.toLowerCase())
    )
    .map((item, index) => {
           return (
          <div className='product' key={index}>
            <p>{item.name}</p>
            <p><img src={item.imageURL} height="300px" width="300px" alt={item.name} /></p>
            {item.category === 'fruits' || item.category === 'vegetables' ? <p>Price: {item.price}/kg</p> : <p>Price: {item.price}</p>}
            <p className='item-count'>
              <input type="submit" value="-" onClick={() => removeFromCart(item)} />
              {cart.find((i) => i && i.id === item.id) ? cart.find((i) => i && i.id === item.id).quantity : 0}
              <input type="submit" value="+" onClick={() => addToCart(item)} />
            </p>
          </div>
        );
    });

const showcart=()=>{
  navigate('/cart',{state:cart})
}
return (
  <div >
    
    <div className='home-header'>Demo E-Commerce Website</div>
    <div className='searchandcart'>
      <div className='home-search' >
        <select  onChange={(e)=>setOptions(e.target.value)}>
                <option value="">All Products</option>
                <option value="fruits">Fruits</option>
                <option value="vegetables">Vegetables</option>
                <option value="electronics">Electronics</option>
                <option value="grocery">Grocery</option>
                <option value="personal care">Health and Personal Care</option>
        </select>
       <div> <input value={value} onChange={(e)=>{setValue(e.target.value)}} placeholder="Search"/></div>
        </div>
      <div><img src={carticon} style={{cursor:'pointer'}}height='20px' width='20px'title='Cart' onClick={showcart} alt="cart"></img></div>
      </div>
      <div>
    {load && jsonData===null?<LoadingComponent/>:jsonData!==null? (
          <div className='product-container'>
            {D.length===0?<div>No Products Found</div>:D}
          </div>
         
    ) : (
      <LoadingComponent/>
    )}
    </div>
  </div>

);
}



export default Home;