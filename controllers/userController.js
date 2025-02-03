import userModel from './../models/userSchema';
import {nanoid , customAlphabet} from "nanoid";




//============================**forgetPassword**================================
export const forgetPassword = asyncHandler(async(req,res,next)=>{
    const {email} = req.body
    const user=await userModel.findOne({email : email.toLowerCase()})
    if(!user){
        return next (new AppError("user not exist",404))
    }
    const code = customAlphabet("0123456789",5)
    const newCode=code()

    await sendEmail(email ,"code for reset password", `<h1>"Your Code Is ${newCode}"</h1>`)
    await userSchema.updateOne({email},{code : newCode}) 
    res.status(200).json({msg:"Done"})
})


//============================**resetpassword**================================
export const resetPassword = asyncHandler(async(req,res,next)=>{
    const {email , code , password} = req.body
    const user=await userModel.findOne({email : email.toLowerCase()})
    if(!user){
        return next (new AppError("user not exist",404))
    }

    if(user.code !== code || code == ""){
        return next (new AppError("invalid code",400))
    }
    const hash=bcrypt.hashSync(password , +process.env.saltRounds)
    
    await userSchema.updateOne({email},{password : hash , code : ""}) 
    res.status(200).json({msg:"Done"})
})


//============================**login**================================
export const login = asyncHandler(async(req,res,next)=>{
    const {email , password} = req.body
    const user=await userModel.findOne({email : email.toLowerCase(), confirmed : true})
    if(!user|| !bcrypt.compareSync(password , user.password)){
        return next (new AppError("user not exist or invalid password",404))
    }
    const token = jwt.sign({email , role:user.role}, process.env.signatureKey)
    
    await userSchema.updateOne({email},{loggedIn : true}) 
    res.status(200).json({msg:"Done",token})
})
