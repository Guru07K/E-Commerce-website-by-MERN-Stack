import React, { useContext} from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'

export default function CartItems() {

    const {all_product, cartItems, removeFromCart, getTotalCartAmount} = useContext(ShopContext);
    
  return (
    <>
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />

{/* 
   {
        (Object.values(cartItems).some( item => item > 0  )) ? ( 
            all_product.map((e)=>{
                if(cartItems[e.id]>0){
                         return <div>
                                     <div className="cartitems-format cartitems-format-main">
                                         <img className='carticon-product-icon' src={e.image} alt="" />
                                         <p>{e.name}</p>
                                         <p>{e.new_price}</p>
                                         <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                                         <p>Rs.{e.new_price*cartItems[e.id]}</p>
                                         <img  src={remove_icon} onClick={()=>{removeFromCart(e.id)}} className='caritems-remove-icon' alt="" />
                                     </div>
                                     <hr />                               
                             </div>
                     }
             })) : (
                    <h1 className='emptycart'>Your cart is empty</h1>
                   )
    }
*/}
      {all_product.map((e)=>{
                if(cartItems[e.id]>0){
                         return <div>
                                     <div className="cartitems-format cartitems-format-main">
                                         <img className='carticon-product-icon' src={e.image} alt="" />
                                         <p>{e.name}</p>
                                         <p>{e.new_price}</p>
                                         <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                                         <p>Rs.{e.new_price*cartItems[e.id]}</p>
                                         <img  src={remove_icon} onClick={()=>{removeFromCart(e.id)}} className='caritems-remove-icon' alt="" />
                                     </div>
                                     <hr />                               
                             </div>
                     }
             })}  


        <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>Cart Totals</h1>
                <div>
                    <div className='cartitems-total-item'>
                        <p>Subtotal</p>
                        <p>Rs.{getTotalCartAmount()}</p>
                    </div>
                    <hr />

                        <div className="cartitems-total-item">
                            <p>Shipping fee</p>
                            <p>Free</p>
                        </div>
                    <hr />

                    <div className="cartitems-total-item">
                        <h3>Total</h3>
                        <h3>Rs.{getTotalCartAmount()}</h3>
                    </div>
                </div>
                <button>Proceed to checkout</button>
            </div>

            <div className="cartitems-promocode">
                <p>If you have promocode, Enter here</p>
                <div className='cartitems-promobox'>
                    <input type="text" placeholder='Promocode' />
                    <button>Submit</button>
                </div>
            </div>

        </div>
        </div>
    </>
  )
}
