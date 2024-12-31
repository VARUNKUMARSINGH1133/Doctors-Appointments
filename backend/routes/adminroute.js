import express from 'express'
import { addDoctor,allDoctors,loginAdmin,appointmentAdmin,appointmentCancel,adminDashboard } from '../controllers/admincontroller.js'
import upload from '../middleware/multer.js'
import authAdmin from '../middleware/authadmin.js'
import {changeAvailability} from '../controllers/doctorcontroller.js'

const adminRouter= express.Router()

adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor)
adminRouter.post('/login',loginAdmin)
adminRouter.post('/all-doctors',authAdmin,allDoctors)
adminRouter.post('/change-availability',authAdmin,changeAvailability)
adminRouter.get('/appointments',authAdmin,appointmentAdmin)
adminRouter.post('/cancel-appointment',authAdmin,appointmentCancel)
adminRouter.get('/dashboard',authAdmin,adminDashboard)
export default adminRouter;