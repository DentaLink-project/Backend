import express from "express";
import { signUpvalidator, loginValidator } from "../utils/validation/userValidation.js";
import { upload } from "../services/imageService.js";
import { signupController, loginController, forgetPasswordController, verifyOTPController, resetPasswordController, logoutController } from "../controllers/userController.js";
import { checkAuth } from "../middleware/checkAuth.js";

const router = express.Router();

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Sign up a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *               role:
 *                 type: string
 *               academicYear:
 *                 type: string
 *               universityID:
 *                 type: number
 *               idPicture:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       500:
 *         description: Server error
 */
router.post("/users/signup", upload.single('idPicture'), signUpvalidator, signupController);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Log in a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid credentials
 */
router.post("/users/login", loginValidator, loginController);

/**
 * @swagger
 * /users/forget-password:
 *   post:
 *     summary: Request a password reset
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reset code sent successfully
 *       500:
 *         description: Server error
 */
router.post("/users/forget-password", forgetPasswordController);

/**
 * @swagger
 * /users/verify-otp:
 *   post:
 *     summary: Verify OTP
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               OTP:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       500:
 *         description: Server error
 */
router.post("/users/verify-otp", verifyOTPController);

/**
 * @swagger
 * /users/reset-password:
 *   post:
 *     summary: Reset password
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               OTP:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       500:
 *         description: Server error
 */
router.post("/users/reset-password", resetPasswordController);

/**
 * @swagger
 * /users/logout:
 *   post:
 *     summary: Log out a user
 *     tags: [User]
 *      security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Logged out successfully
 *       500:
 *         description: Server error
 */
router.post("/users/logout",checkAuth ,logoutController);

export default router;