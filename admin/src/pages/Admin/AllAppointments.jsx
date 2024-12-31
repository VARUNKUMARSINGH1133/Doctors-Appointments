import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets_admin/assets';

const AllAppointments = () => {
  const { aToken, appointments, getAllappointments,currency,cancelAppointment } = useContext(AdminContext);
  
  const {calculateAge,slotDateFormat}= useContext(AppContext)
  useEffect(() => {
    if (aToken) {
      getAllappointments();
    }
  }, [aToken]);

  return (
    <div className='w-full max-w-6xl m-5'>
    <p className='mb-5 text-lg font-medium'>All Appointments</p>
    <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
      <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr grid-flow-col py-3 px-6 border-bottom'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
          {appointments.map((item, index) => (
            <div className= 'flex flex-wrap justify-between max-sm:gap-2 sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50'key={index}>
              <p className='max-sm:hidden'>{index + 1}</p>
              <div className='flex items-center gap-2'>
                <img src={item.userData.image}
                  className='w-8 rounded'
                />
                <p>{item.userData.name}</p>
              </div>
              <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
              <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
              <div className='flex items-center gap-2'>
                <img src={item.docData.image}
                  className='w-8 rounded'
                />
                <p>{item.docData.name}</p>
              </div>
              <p>{currency}</p>
              {
                item.cancelled?
                <p className='text-red-400 text-xs font-medium'> Cancelled</p>
                :
              <img onClick={()=>cancelAppointment(item._id)} className= 'w-10 cursor-pointer'src={assets.cancel_icon}alt="" />
              }
            </div>

          ))
        }
      </div>
    </div>
  );
};

export default AllAppointments;



