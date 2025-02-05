import { signUpStudent } from "../services/signupService.js";
import { generateToken, generateRefreshToken } from "../utils/jwtUtils.js";
import { loginService } from "../services/loginService.js";

export const signUp = async (req, res, next) => {
    try {
        const { name, email, password, phone, role, academicYear, universityID } = req.body;
        const file = req.file;

        const newStudent = await signUpStudent({
            name,
            email,
            password,
            phone,
            role,
            academicYear,
            universityID,
            file,
        });

        const token = generateToken(newStudent._id);
        const refreshToken = generateRefreshToken(newStudent._id);

        res.status(201).json({ message: "User created successfully", token, refreshToken, newStudent });
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    };
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { accessToken, refreshToken } = await loginService({ email, password });

        res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};