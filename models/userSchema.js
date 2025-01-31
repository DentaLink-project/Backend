import { model, Schema } from "mongoose";


const userSchema = new Schema({
    name:{
        type:String,
        required: [true, "name is required"],
        minLength: 3,
        maxLength: 15,
        trim: true,
    },
    email:{
        type:String,
        required: [true, "email is required"],
        trim: true,
        unique: true,
        lowercase: true
    },
    password:{
        type:String,
        required: [true, "password is required"],
        trim: true
    },
    cPassword:{
        type:String,
        select: false 
    },

    phoneNumber:{
        type:String,
        required: [true, "phoneNumber is required"],
    },
    role:{
        type:String,
        enum: ['Student', 'Admin'],
        default: 'Student'
    },
    confirmed:{
        type:Boolean,
        default:false
    }
})
const userModel = model('user', userSchema);
export default userModel