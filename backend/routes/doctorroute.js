import express from 'express'
import { doctorList,loginDoctor,appointmentDoctor,appointmentCancel,appointmentComplete,doctorDashboard, doctorProfile, updateDoctorProfile } from '../controllers/doctorcontroller.js'
import authDoctor from '../middleware/authdoctor.js'

const doctorRouter= express.Router()

doctorRouter.get('/list',doctorList)
doctorRouter.post('/login',loginDoctor)
doctorRouter.get('/appointments',authDoctor,appointmentDoctor)
doctorRouter.post('/complete-appointment',authDoctor,appointmentComplete)
doctorRouter.post('/cancel-appointment',authDoctor,appointmentCancel)
doctorRouter.get('/dashboard',authDoctor,doctorDashboard)
doctorRouter.get('/profile',authDoctor,doctorProfile)
doctorRouter.post('/update-profile',authDoctor,updateDoctorProfile)


export default doctorRouter;