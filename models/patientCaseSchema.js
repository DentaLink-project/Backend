import mongoose from "mongoose";
const patientSchema = new mongoose.
Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String,enum: ["Male", "Female"] ,required: true },
    phone: { type: String, required: true },
    title: { type: String, required: true },  
    category: { type: String, required: true }, 
    location: { type: String, required: true},
    description: { type: String },              
    images: { type: [String], required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },

}, { timestamps: true });

patientSchema.index({ 
    title: "text", 
    description: "text", 
    name: "text", 
    category: "text", 
    location: "text" 
});


const Patient = mongoose.model("Patient", patientSchema);
export default Patient;






