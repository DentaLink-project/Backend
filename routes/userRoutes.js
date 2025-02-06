import express from "express";
import { signUpvalidator, loginValidator } from "../utils/validation/userValidation.js";
import { upload } from "../services/imageService.js";
import { signupController, loginController, forgetPasswordController, verifyOTPController, resetPasswordController, logoutController } from "../controllers/userController.js";

const router = express.Router();

router.post("/users/signup", upload.single('idPicture'), signUpvalidator, signupController);
router.post("/users/login", loginValidator, loginController);
router.post("/users/forget-password", forgetPasswordController);
router.post("/users/verify-otp", verifyOTPController);
router.post("/users/reset-password", resetPasswordController);
router.post("/users/logout", logoutController);


export default router;