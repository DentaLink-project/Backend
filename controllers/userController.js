import { signUpStudent } from "../services/signupService.js";
import { generateToken, generateRefreshToken } from "../utils/jwtUtils.js";
import { loginService } from "../services/loginService.js";
import { forgotPassword } from "../services/forgotPasswordService.js";
import { verifyOTP } from "../services/verifyOTPService.js";
import { resetPassword } from "../services/resetPasswordService.js";

export const signupController = async (req, res, next) => {
    try {
        const { name, email, password, phone, role, academicYear, universityID } = req.body;
        const idPicture = [req.file];

        const newStudent = await signUpStudent({
            name,
            email,
            password,
            phone,
            role,
            academicYear,
            universityID,
            idPicture,
        });

        const token = generateToken(newStudent._id);
        const refreshToken = generateRefreshToken(newStudent._id);

        res.status(201).json({ message: "User created successfully", token, refreshToken, newStudent });
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    };
}

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { accessToken, refreshToken } = await loginService({ email, password });

        res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

export const forgetPasswordController = async (req, res) => {
    try {
        const { email } = req.body;
        const result = await forgotPassword(email);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const verifyOTPController = async (req, res) => {
    const { email, OTP } = req.body;

    try {
        const result = await verifyOTP({ email, OTP });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const resetPasswordController = async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        const result = await resetPassword({ email, newPassword });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const tokenBlacklist = new Set();

export const logoutController = (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
        tokenBlacklist.add(token);
        res.status(200).json({ message: "Logout successful" });
    } else {
        res.status(400).json({ message: "Token not provided" });
    }
};