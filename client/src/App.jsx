import { Route, Routes } from 'react-router-dom';
import MyAppointments from './assets/pages/MyAppointments';
import Doctors from './assets/pages/Doctors';
import Login from './assets/pages/Login';
import MyProfile from './assets/pages/MyProfile';
import Contact from './assets/pages/Contact';
import About from './assets/pages/About';
import Home from './assets/pages/home';
import Appointment from './assets/pages/Appointment';
import Navbar from './components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
function App() {
  return (
    
    <div className="mx-4 sm:mx-10%">
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/appointment/:docId" element={<Appointment/>} />
      </Routes>
    </div>
  );
}

export default App;
