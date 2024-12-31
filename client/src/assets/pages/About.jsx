import React from 'react'
import { assets } from '../assets_frontend/assets'
const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-800'>US</span></p>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image}/>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>Welcome to Prescripto...., your trusted partener in managing your healthcare needs.</p>
          <p>Prescripto is committed to excellence healthcare technology..</p>
          <b>Our Vision</b>
          <p> Our vision at prescripto is to create a seemless healhcare support</p>
        </div>
      </div>
    </div>
  )
}

export default About
