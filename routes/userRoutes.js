import express from "express";
import { signUpvalidator, loginValidator } from "../utils/validation/userValidation.js";
import { upload } from "../services/imageService.js";
import { signUp, login } from "../controllers/userController.js";

const router = express.Router();

router.post("/users/signup", upload.single('idPicture'), signUpvalidator, signUp);
router.post("/users/login", loginValidator, login);


export default router;