import express from "express";
    
import { upload } from "../services/imageService.js";
import { patientCaseValidator } from "../utils/validation/patientValidator.js";
import { checkAuth } from "../middleware/checkAuth.js";
import { deleteExchange, deletePatient, editPatient, fetchExchangesByUser, fetchFavoriteExchanges, fetchFavoritePatients, fetchPatientsByUser } from "../controllers/profileController.js";

const router = express.Router();

router.get("/patients/favoritePatients", checkAuth, fetchFavoritePatients);
router.get("/patients/my-patients", checkAuth, fetchPatientsByUser); 
router.put("/patients/:id", checkAuth, upload.array("images"), patientCaseValidator, editPatient);
router.delete("/patients/:patientId", checkAuth, deletePatient);
router.get("/exchanges/my-exchanges", checkAuth, fetchExchangesByUser);
router.get("/exchanges/favoriteExchanges", checkAuth, fetchFavoriteExchanges);
router.delete("/exchanges/:id", checkAuth, deleteExchange);


export default router