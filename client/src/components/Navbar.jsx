import React,{useContext, useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets_frontend/assets';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
    
  const navigate= useNavigate();
  const [showMenu,setShowMenu]= useState(false);
  const {token,setToken,userData}= useContext(AppContext)
  
  const logout=()=>{
    setToken(false)
    localStorage.removeItem('token')
  }

  return (
    <div className='flex items-center justify-between py-4 mb-5 border-b border-b-gray-400'>
      <img onClick={()=>navigate('/')}className='w-44 cursor-pointer' src={assets.logo} alt='Logo' />

      <ul className='hidden md:flex items-start gap-5 font-medium'>
        <NavLink
          to='/'
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          <li className='py-1'>
            Home
          </li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/25 m-auto hidden' />
        </NavLink>
        <NavLink
          to='/doctors'
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          <li className='py-1'>
            All Doctors
          </li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/25 m-auto hidden' />
        </NavLink>
        <NavLink
          to='/about'
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          <li className='py-1'>
            About
          </li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/25 m-auto hidden' />
        </NavLink>
        <NavLink
          to='/contact'
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          <li className='py-1'>
            Contact
          </li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/25 m-auto hidden' />
        </NavLink>
      </ul>

      <div className='flex items-center gap-4'>
        {token && userData ? (
          <div className='flex items-center gap-2 cursor-pointer relative group'>
            <img className='w-8 rounded-full' src={assets.profile_pic} alt='Profile' />
            <img className='w-2.5' src={assets.dropdown_icon} alt='Dropdown' />
            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 hidden group-hover:block z-20'>
            <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
              <p onClick={()=>navigate('/my-profile')}className='cursor-pointer hover:text-primary'>My Profile</p>
              <p onClick={()=>navigate('/my-appointments')}className='cursor-pointer hover:text-primary'>My Appointments</p>
              <p onClick={()=>{logout()}}className='cursor-pointer hover:text-primary'>Log Out</p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'
          >
            Create Account
          </button>
        )}
        <img onClick={()=>setShowMenu(true)} className='w-6 md:hidden'src={assets.menu_icon}/>
      <div className={`${showMenu? 'fixed w-full': 'h-0 w-0'}md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
        <div className='flex items-center justify-between'>
          <img className='w-36'src={assets.logo}/>
          <img className='w-7'onClick={()=>setShowMenu(false)} src={assets.cross_icon}/>
        </div>
        <ul className='felx flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
          <NavLink className='px-4 py-2 rounded inline-block' to='/'><p>Home</p></NavLink>
          <NavLink className='px-4 py-2 rounded inline-block'to='/doctors'><p>All Doctors</p></NavLink>
          <NavLink className='px-4 py-2 rounded inline-block'to='/about'><p>About</p></NavLink>
          <NavLink className='px-4 py-2 rounded inline-block'to='/contact'><p>Contact</p></NavLink>
        </ul>
        </div>
      </div>
    </div>
  );
};


export default Navbar;
