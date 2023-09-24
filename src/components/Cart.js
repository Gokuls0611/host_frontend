// Page2.js
import React, { useEffect ,useState} from 'react';
import axios from 'axios';
import LoadingComponent from './LoadingComponent';

function Cart() {
  const [cart, setCart] = useState([]);
  const [cost,setCost] = useState([]);
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    const c = sessionStorage.getItem('cart')
    const par = JSON.parse(c)
    setCart(par)
    axios.get("https://proud-puce-springbok.cyclic.app/products")
      .then((response) => {
        const data = response.data.map(item => ({ id: item.id, price: item.price }))
        setCost(data)
      })
      .catch((error) => {
        console.error('Error fetching file:', error);
      });  
      setTimeout(()=>{
        setLoading(true)
      },2000)
  },[])

  const addToCart=(product)=>{
      product.quantity =product.quantity+1
      const priceid = cost.filter((item)=>item.id===product.id)
      console.log("price",priceid[0].price)
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
    console.log("Homecart",cart)
    
  };

  useEffect(()=>{
    sessionStorage.setItem("cart",JSON.stringify(cart))
  })
console.log("cart",cart)
  return (
    <div>
      <h1>Cart</h1>
      {loading?(
        cart.length===0?
        (<p>No Products Selected</p>)
        :
        <ul>
        {cart.map((item,index) => (
          <div key={index}>
            <p>{item.name}</p>
            <p>{item.quantity}</p>
            <p>{item.price}</p>
            <p className='item-count'>
            <input type="submit" value="+" onClick={() => addToCart(item)}/>
            {item.quantity}
            <input type="submit" value="-" onClick={() => removeFromCart(item)}/>
            </p>
          </div> 
          ))
        }
      </ul>
      ):(<LoadingComponent/>) 
    }
    </div>
    
  );
}

export default Cart;
