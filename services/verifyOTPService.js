import Student from "../models/studentSchema.js";

export const verifyOTP = async ({ email, OTP }) => {
    try {
        const student = await Student.findOne({ email });
        if (!student) {
            throw new Error('Student not found');
        }

        if (student.otpCode !== OTP || student.otpExpiresAt < new Date()) {
            throw new Error('Invalid or expired OTP' );
        }

        return { message: 'OTP verified successfully' };
    } catch (err) {
        console.error('Error in verifyOTP:', err);
        throw new Error('Server Error');
    }
};