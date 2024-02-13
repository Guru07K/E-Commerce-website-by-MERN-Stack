import React from 'react'
import './Hero.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import hero_image from '../Assets/hero_image.png'

export default function Hero() {
  return (
    <div className='hero'>
      {/* -------------------- Left side container -------------------- */}
        <div className="hero-left">
         <h2>NEW ARRIVALS ONLY</h2>
            <div>        
                <div className="hero-hand-icon">
                    <p>new</p>
                    <img src={hand_icon} alt="" />
                </div>
                <p>Collections</p>
                <p>For Everone</p>
            </div>
            <div className="hero-latest-btn">
                <div>Latest Collections</div>
                <img src={arrow_icon} alt="" />
            </div>
        </div>

     {/* -------------------- Right side container -------------------- */}
        <div className="hero-right">
            <img src={hero_image} alt="" />
        </div>
    </div>
  )
}
