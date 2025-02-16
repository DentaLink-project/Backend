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
router.get("/favorites", checkAuth, PC.fetchFavoritePatients);
router.get("/my-patients", checkAuth, PC.fetchPatientsByUser); 
router.get("/search",checkAuth,PC.fetchPatientsByTitle);
router.get("/:id" ,checkAuth,PC.fetchPatientById)
router.put("/:id", checkAuth, upload.array("file"), patientCaseValidator, PC.editPatient);
router.delete("/:patientId", checkAuth, PC.deletePatient);


export default router;