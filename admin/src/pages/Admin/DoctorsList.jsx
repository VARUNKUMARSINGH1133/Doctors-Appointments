import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
        .then(() => console.log("Doctors fetched successfully"))
        .catch(err => console.error("Error fetching doctors:", err));
    }
  }, [aToken]);

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Doctors</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {doctors.map((item, index) => (
          <div
            className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group"
            key={index}>
          
            <img
              src={item.image || "/placeholder.png"}
              alt={item.name}
              className=" bg-indigo-50 group-hover:bg-primary transition-all duration-500"
            />
            <div className="p-4">
              <p className="font-bold">{item.name}</p>
              <p className="text-sm text-gray-500">{item.speciality}</p>
              <div className="flex items-center gap-2 mt-2">
                <input onChange={()=>changeAvailability(item._id)}
                  type="checkbox"
                  checked={item.available}
                />
                <p>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
