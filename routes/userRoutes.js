import express from "express";
import { signUpvalidator } from "../validators/userValidation";
import { upload } from "../services/imageService";
import { signup } from "../controllers/userController";

const router = express.Router();

router.post("/signup", upload.single('idPicture'), signUpvalidator, signup);

export default router;