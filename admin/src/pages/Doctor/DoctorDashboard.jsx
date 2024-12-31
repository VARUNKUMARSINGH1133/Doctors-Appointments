import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets_admin/assets'
import { AppContext } from '../../context/AppContext'


const DoctorDashboard = () => {

  const { dashData, setDashData, getDashData, dToken,completeAppointment,cancelAppointment } = useContext(DoctorContext)
  const { currency, slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getDashData()
    }
  }, [dToken])

  return dashData && (
    <div className='m-5'>
      <div className='flex flex-wrap gap-3'>
        <div className=' flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.earning_icon} />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.earning}</p>
            <p className='text-gray-500'>{currency} arnings</p>
          </div>
        </div>
        <div className=' flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.appointment_icon} />

          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
            <p className='text-gray-500'>Appointments</p>
          </div>
        </div>
        <div className=' flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.patients_icon} />

          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
            <p className='text-gray-500'>Patients</p>
          </div>
        </div>
      </div>
      <div className='bg-white'>
        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
          <img src={assets.list_icon} />
          <p className='font-semibold'>Latest Bookings</p>
        </div>
        <div className='pt-4 border border-t-0'>
          {dashData.latestAppointments.map((item, index) => (
            <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
              <img className='rounded-full w-10' src={item.userData.image} />
              <div className='flex-1 text-sm'>
                <p className='text-gray-800 font font-medium'>{item.userData.name}</p>
                <p className='text-gray-600'>{slotDateFormat(item.slotDate)}</p>
              </div>
              {
                item.cancelled ?
                  <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                  :
                  item.isCompleted ?
                    <p className='text-primary text-xs font-medium'>Completed</p>
                    :
                    <div className='flex'>
                      <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer border' src={assets.cancel_icon}/>
                      <img onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer border' src={assets.tick_icon}/>
                    </div>
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard
