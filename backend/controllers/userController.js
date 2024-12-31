import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from '../models/usermodel.js';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctormodel.js';
import appointmentModel from '../models/appointmentmodel.js';
import razorpay from 'razorpay'
// Register a new user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !password || !email) {
      return res.json({ success: false, message: "Missing details" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter valid email" });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "Password must be at least 8 characters" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = { name, email, password: hashedPassword };
    const newUser = new userModel(userData);
    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    return res.json({ success: true, token });  // Set proper success status
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// Get user profile
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select('-password');
    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !address || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }

    // Update user data
    await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender });

    // Handle image upload
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
      const imageUrl = imageUpload.secure_url;
      await userModel.findByIdAndUpdate(userId, { image: imageUrl });
    }

    res.json({ success: true, message: "Profile updated" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

const bookAppointment= async(req,res)=>{
  try{
    const {userId,docId,slotTime,slotDate} =req.body;
    const docData= await doctorModel.findById(docId).select('-password')
    if(!docData.available){
      return res.json({success:false, message:"Doctor is not available"})
    }
    let slots_booked=docData.slots_booked

    if(slots_booked[slotDate]){
      if(slots_booked[slotDate].includes(slotTime)){
        return res.json({success:false, message:"Slot not available"})
      }else{
        slots_booked[slotDate].push(slotTime)
      }
    }else{
      slots_booked[slotDate]=[]
      slots_booked[slotDate].push(slotTime)
    }
    const userData= await userModel.findById(userId).select('-password')
    delete docData.slots_booked
    
    const appointmentData={
      userId,
      docId,
      userData,
      docData,
      amount:docData.fees,
      slotDate,
      slotTime,
      date:Date.now(),
    }
    const newAppointment= new appointmentModel(appointmentData)
    await newAppointment.save()

    await doctorModel.findByIdAndUpdate(docId,{slots_booked})
    res.json({success:true,message:"Appointment Booked"})
  }
  catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
}

const listAppointment= async(req,res)=>{
  try{
    const {userId}= req.body
    const appointments= await appointmentModel.find({userId})
    res.json({success:true,appointments})
  }
  catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
}

const cancelAppointment=async(req,res)=>{
  try{
    const {userId,appointmentId}= req.body
    const appointmentData= await appointmentModel.findById(appointmentId)


    if(appointmentData.userId!==userId){
      return res.json({success:false,message:'Unauthorized action'})
    }
    await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})

    const {docId,slotDate,slotTime}= appointmentData
    const doctorData= await doctorModel.findById(docId)
    let slots_booked= doctorData.slots_booked
    slots_booked[slotDate]=slots_booked[slotDate].filter(e=>e!=slotTime)

    await doctorModel.findByIdAndUpdate(docId,{slots_booked})
    res.json({success:true,message:'Appointment Cancelled'})

  }catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
}
// const razorpayInstance= new razorpay({
//   key_id:process.env.RAZORPAY,
//   key_secret:''

// })
// const paymentRazorpay= async(req,res)=>{

// }

export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment };
