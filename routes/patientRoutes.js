import express from "express";
// import { createPatient, deletePatient,
//     fetchAllPatients,
//     fetchPatientById,
//     fetchPatientsByTitle,
//     fetchPatientsByUser,
//     updatePatientStatus} from "../controllers/patientController.js";
import * as PC from '../controllers/patientController.js'
    
import { upload } from "../services/imageService.js";
import { patientCaseValidator, validatePatientUpdate } from "../utils/validation/patientValidator.js";
import { checkAuth } from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/add", checkAuth, upload.single("file"), patientCaseValidator,PC.createPatient);



export default router;