import React, { useContext } from 'react'
import {assets} from '../assets/assets_admin/assets'
import { AdminContext } from '../context/AdminContext'
import {DoctorContext} from '../context/DoctorContext'

import {useNavigate} from 'react-router-dom'
const Navbar = () => {

    const {aToken,setAToken}= useContext(AdminContext)
    const {dToken,setDToken}= useContext(DoctorContext)
    const navigate= useNavigate()
    const logout= ()=>{
        navigate('/')
        dToken && setDToken('')
        dToken && localStorage.removeItem('dToken')
        aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')
    }


  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
      <div className='flex items-center gap-2 text-sm'>
        <img className='w-36 sm:w-40 cursor-pointer'src={assets.admin_logo}/>
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-800 '>
            {aToken?'Admin':'Doctor'}
        </p>
      </div >
      <button onClick={logout} className='bg-primary text-white text-sm px-10 py-2 rounded-full' >
        Logout
      </button>
    </div>
  )
}

export default Navbar