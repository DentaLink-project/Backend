import express from "express";
import { signUpvalidator } from "../utils/validation/userValidation.js";
import { upload } from "../services/imageService.js";
import { signUp } from "../controllers/userController.js";

const router = express.Router();

router.post("/users/signup", upload.single('idPicture'), signUpvalidator, signUp);

export default router;