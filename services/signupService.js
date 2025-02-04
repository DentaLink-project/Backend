import Student from "../models/studentSchema";
import { hashPassword } from "../utils/passwordUtils";
import { uploadImage } from "./imageService";

export const signUpStudent = async ({ name, email, password, phone, role, academicYear, universityID, file }) => {
    if (!file) {
        throw new Error("ID Picture is required");
    }
  
    const imageUrl = await uploadImage(file);
  
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