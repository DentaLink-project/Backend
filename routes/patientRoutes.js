import express from "express";
import {
    createPatient, fetchAllPatients, fetchPatientById, searchPatients, toggleFavouritePatient
} from "../controllers/patientController.js";
import { upload } from "../services/imageService.js";
import { patientCaseValidator } from "../utils/validation/patientValidator.js";
import { checkAuth } from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/add", checkAuth, upload.array("images"), patientCaseValidator,createPatient);
router.get("/", checkAuth, fetchAllPatients);
router.post("/toggle", checkAuth, toggleFavouritePatient);
router.get("/search", checkAuth, searchPatients);
router.get("/:id", checkAuth, fetchPatientById);


export default router;