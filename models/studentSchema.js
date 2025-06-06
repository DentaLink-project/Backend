import mongoose, { Schema } from "mongoose";
import User from "./userSchema.js";

const studentSchema = new mongoose.Schema({
    academicYear: { type: String, required: true },
    universityID: { type: Number, required: true },
    IDPicture: [{ type: String, required: true }],
    cases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Case' }],
    tools: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tool' }],
    favoritePatients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Patient" }],
    favoriteTools: [{type: mongoose.Schema.Types.ObjectId, ref: "Tool"}],
    favoritesExchanges: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exchange" }], 
    otpCode: { type: String },
    otpExpiresAt: { type: Date }
}, { timestamps: true })

const Student = User.discriminator('Student', studentSchema);

export default Student;