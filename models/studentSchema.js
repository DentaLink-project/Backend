import mongoose, { Schema } from "mongoose";
import User from "./userSchema";

const studentSchema = new mongoose.Schema({
    academicYear: { type: String, required: true },
    universityID: { type: Number, required: true },
    IDPicture: { type: String, required: true },
    cases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Case' }],
    tools: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tool' }]
}, { timestamps: true })

const Student = User.discriminator('student', studentSchema);

export default Student;