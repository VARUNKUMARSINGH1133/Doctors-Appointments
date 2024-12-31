import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20'>
      <div className='md:w-full flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[5vw] md:mb-[-30px]'>
        <p className='text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight md:leading-tight lg:leading-tight'>Book Appointment<br/>with Trusted doctor</p>
        <div>
            Simply browse through our extensive list of trusted doctors,<br/> and schedule your appointment hazzle-free..
        </div>
        <a href="#speciality"className='flex items-center gap-3 bg-white px-8 py-2 rounded-full text-gray-600 text-sm m-auto hover:scale-105 transition-all duration-300'><b>Book Appointment</b> <img className='w-3' src={assets.arrow_icon}/></a>
      </div>
    </div>
  )
}

export default Header
