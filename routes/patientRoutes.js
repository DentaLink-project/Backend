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
router.get("/", checkAuth, PC.fetchAllPatients);
router.post("/toggle", checkAuth, PC.toggleFavoriteController);
router.get("/favorites", checkAuth, PC.fetchFavoritePatients);
router.get("/my-patients", checkAuth, PC.fetchPatientsByUser); 
router.get("/search",PC.fetchPatientsByTitle);
router.get("/:id" ,checkAuth,PC.fetchPatientById)
router.put("/:id", checkAuth,validatePatientUpdate, PC.editPatient);



export default router;