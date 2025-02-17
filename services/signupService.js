import Student from "../models/studentSchema.js";
import { hashPassword } from "../utils/passwordUtils.js";
import { uploadImage } from "./imageService.js";

export const signUpStudent = async ({ name, email, password, phone, role, academicYear, universityID, idPicture }) => {
    if (!idPicture) {
        throw new Error("ID Picture is required");
    }
  
    const imageUrl = await uploadImage(idPicture);
  
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
        throw new Error("Student already exists");
    }
  
    const hashedPassword = await hashPassword(password);
  
    const newStudent = new Student({
        name,
        email,
        password: hashedPassword,
        phone,
        role,
        academicYear,
        universityID,
        IDPicture: imageUrl,
    });
  
    await newStudent.save();
  
    return newStudent;
};