import Student from "../models/studentSchema.js";
import { hashPassword } from "../utils/passwordUtils.js";
import { generateToken,generateRefreshToken } from "../utils/jwtUtils.js";

export const resetPassword = async ({ email, newPassword }) => {
    try {
        const student = await Student.findOne({ email });
        if (!student) {
            throw new Error('Student not found');
        }

        student.password = await hashPassword(newPassword);

        student.otpCode = undefined;
        student.otpExpiresAt = undefined;

        await student.save();

        const accessToken = generateToken(student._id);
        const refreshToken = generateRefreshToken(student._id);

        return { message: 'Password has been reset successfully', accessToken, refreshToken };
    }
    catch (err) {
        console.error('Error in resetPassword:', err);
        throw new Error('Server Error');
    }
};