import React, { useContext, useRef, useState } from 'react'
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import nav_dropdown from '../Assets/dropdown_icon.png'


export default function Navbar() {

  const [menu, setMenu] = useState("shop");
  const {getTotalCartItems} = useContext(ShopContext);
  const menuRef = useRef();

  const dropdown_toggle = (e)=> {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open')
  }

  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>Guru Cart</p>
      </div>

    <img onClick={dropdown_toggle} src={nav_dropdown} className='nav_dropdown' alt="" />

      <ul ref={menuRef} className="nav-menu">
        <li onClick={()=>{setMenu("shop")}}> <Link to='/'> <span style={{ color: menu === "shop" ? '#f3cba5' : 'black' }}> Shop </span> </Link> {menu==="shop"?<hr/>:<></>} </li>
        <li onClick={()=>{setMenu("mens")}}> <Link to='/mens'><span style={{ color: menu === "mens" ? '#f3cba5' : 'black' }}> Men  </span></Link> {menu==="mens"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("womens")}}> <Link to='/womens'><span style={{ color: menu === "womens" ? '#f3cba5' : 'black' }}> Womens </span></Link> {menu==="womens"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("kids")}}> <Link to='/kids'><span style={{ color: menu === "kids" ? '#f3cba5' : 'black' }}> Kids </span></Link> {menu==="kids"?<hr/>:<></>}</li>
      </ul>

      <div className="nav-login-cart">
        {
          localStorage.getItem('auth-token')
          ?
          <button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
          : <Link to='/login'> <button>Login</button>  </Link>
        }
            
          <Link to='/cart'> <img src={cart_icon} alt="" />   </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  )
}
