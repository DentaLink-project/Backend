import Student from "../models/studentSchema.js";
import sendMail from "../utils/sendMail.js";

export const forgotPassword = async (email) => {
    try {
        const student = await Student.findOne({ email });
        if (!student) {
            throw new Error('Student not found');
        }
        const OTP = Math.floor(1000 + Math.random() * 9000).toString();
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

        student.otpCode = OTP;
        student.otpExpiresAt = expiresAt;
        await student.save();


    await sendMail({
            to: student.email,
            subject: 'Your Sign‑In OTP',
            html: `<p>Your OTP is <strong>${OTP}</strong>. It will expire in 15 minutes.</p>`
        }); 
        return { message: 'Reset code sent successfully' };
    }
    catch (err) {
        console.error('Error in forgotPassword:', err);
        throw new Error('Error sending email');
    }
}