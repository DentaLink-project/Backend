import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: Number, required:true },
    role: { type: String, enum: ["Student", "Admin"], default: "Student" },
    loggedIn:{type:Boolean,default:false}
}, { discriminatorKey: 'role', timestamps: true });
  
const User = mongoose.model("User", userSchema);
export default User;
