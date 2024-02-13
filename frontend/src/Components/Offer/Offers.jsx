import React from 'react'
import './Offer.css'
import exlusive_image from '../Assets/exclusive_image.png'

export default function Offers() {
  return (
    <div className='offers'>
        <div className="offers-left">
            <h1>Exclusive</h1>
            <h1>Offers for you!</h1>
            <p>ONLY ON BEST SELLEERS PRODUCTS</p>
            <button>Check Out</button>
        </div>
        <div className="offers-right">
            <img src={exlusive_image} alt="" />
        </div>
    </div>
  )
}
