import jwt from 'jsonwebtoken'

//user authentication middleware

const authDoctor= async(req,res,next)=>{
    try{
        const {dtoken}= req.headers
        if(!dtoken){
            return res.json({success:false,message:"Not authorised"})
        }
        const tokendecode= jwt.verify(dtoken,process.env.JWT_SECRET)
        req.body.docId= tokendecode.id
        next()
    }catch(e){
        console.log(e);
        res.json({success:false,message:e.message})
    }
}
export default authDoctor;