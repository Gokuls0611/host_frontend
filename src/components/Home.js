import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css'
import LoadingComponent from './LoadingComponent';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [jsonData, setJsonData] = useState([]);
  const [value,setValue] = useState("");
  const [cart, setCart] = useState([]);
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
    axios.get("https://wild-teal-basket-clam-fez.cyclic.cloud/products")
      .then((response) => {
        const data = response.data;
        setJsonData(data);
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

  const showcart=()=>{
    navigate('/cart',{state:cart})
  }
  return (
    <div >
      
      <div className='home-header'>Demo E-Commerce Website</div>
      <div>
        <input  className='home-search' value={value} onChange={(e)=>{setValue(e.target.value)}} placeholder="Search"/>
      </div>
      <div><input type='button' value="Cart" onClick={showcart}/></div>
      
      {jsonData!==null? (
            value?(
            <div>
              <ul  className='product-container'>
              {jsonData.map((item, index) => {
                if((item.name.toLowerCase()).includes(value.toLowerCase())){
                  return(
                <div  className='product' key={index}>
                <p>{item.name}</p>
                <p><img src={item.imageURL} height="300px" width="300px" alt={item.name} /></p>
                <p>Price: {item.price}/kg</p>
                <p className='item-count'>
                <input type="submit" value="+" onClick={() => addToCart(item)}/>
                {cart.find((i)=>i&& i.id===item.id)?cart.find((i)=>i&& i.id===item.id).quantity:0}
                <input type="submit" value="-" onClick={() => removeFromCart(item)}/>
                </p>
                </div>
                )
                }else{
                  return null
                }   
                  })}
              </ul>
           </div>):(
            <div>
            <ul  className='product-container'>
            {jsonData.map((item, index) =>(
                <div  className='product' key={index}>
                <p>{item.name}</p>
                <p><img src={item.imageURL} height="300px" width="300px" alt={item.name} /></p>
                <p>Price: {item.price}/kg</p>
                <p className='item-count'>
                <input type="submit" value="+" onClick={() => addToCart(item)}/>
                {cart.find((i)=>i&& i.id===item.id)?cart.find((i)=>i&& i.id===item.id).quantity:0}
                <input type="submit" value="-" onClick={() => removeFromCart(item)}/>
                </p>
                </div>
                )  
            )}
            </ul>
            </div>
           )
      ) : (
        <LoadingComponent/>
      )}
    </div>

  );
}



export default Home;
