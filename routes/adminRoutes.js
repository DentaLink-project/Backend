import express from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import Admin from "../models/adminSchema.js";
import User from "../models/userSchema.js";
import { hashPassword } from "../utils/passwordUtils.js";
import { checkAdmin } from "../middleware/checkAdmin.js";
const router = express.Router();

router.post("/create", checkAuth, checkAdmin, async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists." });
        }

        const hashedPassword = await hashPassword(password);

        const newAdmin = new Admin({ name, email, password: hashedPassword, role: "Admin", phone });
        await newAdmin.save();

        res.status(201).json({ message: "Admin created successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;