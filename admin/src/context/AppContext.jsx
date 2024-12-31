import { createContext } from "react";

export const AppContext= createContext();

const AppContextProvider=(props)=>{
    const calculateAge=(dob)=>{
        const today= new Date()
        const birthDate= new Date(dob)
        let age= today.getFullYear()-birthDate.getFullYear();
        return age;
      }
      const currency= 'Rs. '
      const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

      const slotDateFormat= (slotDate)=>{
        const dateArray = slotDate.split('_');
          const monthIndex = parseInt(dateArray[1], 10) - 1;
          return `${dateArray[0]} ${months[monthIndex]} ${dateArray[2]}`;
      }
    const value={
        calculateAge,slotDateFormat,currency
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}
export default AppContextProvider;