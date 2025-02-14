import mongoose from "mongoose";
const patientSchema = new mongoose.
Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String,enum: ["Male", "Female"] ,required: true },
    phone: { type: String, required: true },
    title: { type: String, required: true },  
    category: { type: String, required: true }, 
    description: { type: String },              
    file: { type: String },         
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },

}, { timestamps: true });

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;






