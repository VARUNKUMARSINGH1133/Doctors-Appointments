import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets_admin/assets';

const DoctorAppointment = () => {
  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    getAppointments();
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border-rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
        {/* Header Row */}
        <div className="hidden sm:grid grid-cols-[auto_2fr_1fr_3fr_1fr_1fr] gap-4 py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {/* Data Rows */}
        {appointments.reverse().map((item, index) => (
          <div
            key={index}
            className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[auto_2fr_1fr_3fr_1fr_1fr] gap-4 items-center text-gray-500  py-3 px-6 border-b hover:bg-gray-200"
          >
            <p className='max-sm:hidden'>{index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                src={item.userData.image}
                alt="User"
                className="w-8 rounded-full"
              />
              <p>{item.userData.name}</p>
            </div>
            <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
            <p>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>
            <p>{currency} {item.amount}</p>
            {
              item.cancelled?
              <p className='text-red-400 text-xs font-medium'>Cancelled</p>
              :
              item.isCompleted?
              <p className='text-primary text-xs font-medium'>Completed</p>
              :

            <div className='flex'>
              <img
                onClick={() => cancelAppointment(item._id)}
                className='w-10 cursor-pointer border'
                src={assets.cancel_icon}
                alt="Cancel Icon"
                />
              <img
                onClick={() => completeAppointment(item._id)}
                className='w-10 cursor-pointer border'
                src={assets.tick_icon}
                alt="Tick Icon"
                />
            </div>
              }

          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointment;
