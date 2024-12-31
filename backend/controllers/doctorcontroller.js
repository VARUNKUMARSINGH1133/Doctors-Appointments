import doctorModel from "../models/doctormodel.js"
import appointmentModel from "../models/appointmentmodel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body
        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })
        res.json({ success: true, message: 'Availability changed' })


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password,-email'])
        res.json({ success: true, doctors })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body
        const doctor = await doctorModel.findOne({ email })
        if (!doctor) {
            return res.json({ success: true, message: 'Invalid credentials' })
        }
        const isMatch = await bcrypt.compare(password, doctor.password,)
        if (isMatch) {
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET)

            res.json({ success: true, token })
        } else {
            res.json({ success: true, message: 'Invalid credentials' })
        }

    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const appointmentDoctor = async (req, res) => {
    try {
        const { docId } = req.body
        const appointments = await appointmentModel.find({ docId })
        res.json({ success: true, appointments })
    }

    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const appointmentComplete = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
            return res.json({ success: true, message: 'Appointment Completed' })
        } else {
            return res.json({ success: false, message: 'Mark Failed' })
        }
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const appointmentCancel = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
            return res.json({ success: true, message: 'Appointment Cancelled' })
        } else {
            return res.json({ success: false, message: 'Cancellation Failed' })
        }
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const doctorDashboard= async(req,res)=>{
    try{
        const {docId}= req.body
        const appointments= await appointmentModel.find({docId})
        let earning=0
        appointments.map((item)=>{
            if(item.isCompleted){
                earning+=item.amount
            }
        })
        let patients= [];
        appointments.map((item)=>{
            if(!patients.includes(item.userId)){
                patients.push(item.userId)
            }
        })
        const dashData={
            earning,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0,4)
        }
        res.json({success:true,dashData})
    }catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const doctorProfile= async(req,res)=>{
    try{
        const {docId}= req.body
        const profileData= await doctorModel.findById(docId).select('-passward')
        
        res.json({success:true,profileData})
    }catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const updateDoctorProfile = async(req,res)=>{
    try{
        const { docId,fees,address,available }= req.body
        await doctorModel.findByIdAndUpdate(docId,{fees,address,available})
        res.json({success:true,message:'Profile Updated'})
    }catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { changeAvailability, doctorList, loginDoctor, appointmentDoctor, appointmentComplete, appointmentCancel,doctorDashboard,doctorProfile,updateDoctorProfile }
