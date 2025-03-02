import Student from "../models/studentSchema.js";
import { comparePassword } from "../utils/passwordUtils.js";
import { generateToken, generateRefreshToken } from "../utils/jwtUtils.js";

export const loginService = async ({ email, password }) => {
    try {
        const student = await Student.findOne({ email });
        if (!student || !await comparePassword(password, student.password)) {
            throw new Error('Invalid email or password');
        }
        const accessToken = generateToken(student._id);
        const refreshToken = generateRefreshToken(student._id);
        return { accessToken, refreshToken };
    }
    catch (err) {
        console.error(err);
        throw new Error(err.message);
    }
}