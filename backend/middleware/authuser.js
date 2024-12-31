import jwt from 'jsonwebtoken'

//user authentication middleware

const authUser= async(req,res,next)=>{
    try{
        const {token}= req.headers
        if(!token){
            return res.json({success:false,message:"Not authorised"})
        }
        const tokendecode= jwt.verify(token,process.env.JWT_SECRET)
        req.body.userId= tokendecode.id
        next()
    }catch(e){
        console.log(e);
        res.json({success:false,message:e.message})
    }
}
export default authUser;