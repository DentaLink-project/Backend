import userModel from "../models/userSchema.js";
import { sendEmail } from "../services/signupService.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"



//============================**signUp**=================================

export const signUp = async(req , res , next)=>{
    try{
        const {name  , email , password , cPassword , role , phoneNumber} = req.body;
        if (role !== 'Admin' && role !== 'Student') {
            return res.status(400).json({ msg: "Invalid role. Only 'admin' or 'student' are allowed." });
        }
        if(password !== cPassword) {
            return res.status(400).json({ msg: "Passwords do not match." });
        }
        const userExists = await userModel.findOne({ email });
        if(userExists) {
            return res.status(400).json({ msg: "Email already exists." });
        }
        const token  = jwt.sign({email} ,  process.env.signatureKey)
        const link = `http://localhost:3000/users/confirmEmail/${token}`;

        const checkSendEmail = await sendEmail(email , "hi" , `<a href='${link}' > confirm your email</a>`);
        if(!checkSendEmail) {
            return res.status(500).json({
                msg: "Failed to send email"
            });
        }
        const hash = bcrypt.hashSync(password , 10)
        const user = await userModel.create({name , email , password:hash  , role , phoneNumber})
        res.status(201).json({ msg: "User registered successfully" , user });
    }catch(error){
        console.log(error)
        res.status(400).json({msg:"User not created" , error})
    }
}
//============================**confirmEmail**=================================
export const confirmEmail = async(req , res , next)=>{
    const{token} = req.params
    const decoded = jwt.verify(token , process.env.signatureKey)
    if(!decoded?.email) {
        return res.status(400).json({ msg: "Invalid token" });
    }
    const user = await userModel.findOneAndUpdate(
        {email: decoded.email , confirmed:false },{confirmed:true},{new:true}
    );
    if(!user) {
        return res.status(400).json({ msg: "User not found or already confirmed" });
    }
    res.status(200).json({ msg: "done", user });
}

//============================**getUsers**================================
export const getUsers = async(req,res,next)=>{
    try{
        const users = await userModel.find()
        res.status(200).json({users})
    }catch(error){
        console.log(error)
        res.status(500).json({msg:"Failed to get users",error})
    }
}

