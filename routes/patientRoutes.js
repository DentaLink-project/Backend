import express from "express";
// import { createPatient, deletePatient,
//     fetchAllPatients,
//     fetchPatientById,
//     fetchPatientsByTitle,
//     fetchPatientsByUser} from "../controllers/patientController.js";

import * as PC from '../controllers/patientController.js'
    
import { upload } from "../services/imageService.js";
import { patientCaseValidator } from "../utils/validation/patientValidator.js";
import { checkAuth } from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/add", checkAuth, upload.array("file"), patientCaseValidator,PC.createPatient);
router.get("/", checkAuth, PC.fetchAllPatients);
router.post("/toggle", checkAuth, PC.toggleFavoriteController);
router.get("/search",checkAuth,PC.fetchPatientsByTitle);
router.get("/:id" ,checkAuth,PC.fetchPatientById)


export default router;