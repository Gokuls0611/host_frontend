import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './cart.css'
import { NavLink,useNavigate } from 'react-router-dom'
import LoadingComponent from './LoadingComponent'
import { message } from 'antd'

export default function Placeorder() {
    const navigate = useNavigate()
    const [order,setOrder] = useState([])
    const [oid,setOid] = useState([])
    const [loading,setLoading] = useState(true)
    const order_delete =(e) =>{
        axios.post("https://shiny-pink-umbrella.cyclic.app/",{t:localStorage.getItem('token')})
        .then(res=>{
          if(res.data.valid){
          axios.post('https://shiny-pink-umbrella.cyclic.app/deleteOrder',{t:localStorage.getItem('token'),id:e.target.value})
          .then(res=>{
            axios.post('https://shiny-pink-umbrella.cyclic.app/orderList',{t:localStorage.getItem('token')})
                .then(res=>{
                setOrder(res.data.order.map((i)=>i.items))
                setOid(res.data.order.map((i)=>i._id))
                setLoading(false)
                })
            message.info(res.data.message)
          })
        }else{
          message.info("Login to Continue")
          navigate('/login')
        }
        })
    }
    useEffect(()=>{
        axios.post("https://shiny-pink-umbrella.cyclic.app/",{t:localStorage.getItem('token')})
        .then(res=>{
          if(res.data.valid){
          axios.post('https://shiny-pink-umbrella.cyclic.app/orderList',{t:localStorage.getItem('token')})
          .then(res=>{
              setOrder(res.data.order.map((i)=>i.items))
              setOid(res.data.order.map((i)=>i._id))
              setLoading(false)
          })
        }else{
          message.info("Login to Continue")
          navigate('/login')
        }
        })
    },[])

  
  return (
    <div className='mtop'>
    <p><h1>Orders Placed</h1></p>
        {loading?
          <LoadingComponent/>
        : 
        order.length===0? 
        (<div>
            <p>No Products Selected</p>
            <div>
            <footer><NavLink to='/'>Return to HomePage</NavLink></footer>
            </div>
            </div>
          ):(
            <div className='cart_container'>
            {order.map((i,index)=>
            <div className='po' key={index}>
            <table className='layout'>
            <thead>
            <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
            </tr>
            </thead>
            <tbody>
            {i.map((v,index)=>
                <tr key={index}>
                <td>{v.name}</td>
                <td>{v.quantity}</td>
                <td>{v.price}</td>
                </tr>
            )}
            </tbody>            
            </table>
            <div className='total-placed'>Total:{i.reduce((total, item) => total +item.price,0)}</div>
            <button value={oid[index]} onClick={order_delete}>Cancel Order</button>
            </div>
           
            ) 
            }
        </div>)}
        </div>
    
  )
}
