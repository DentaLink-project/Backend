import express from "express";
import {
    createPatient, fetchAllPatients, fetchPatientById, searchPatients, toggleFavouritePatient
} from "../controllers/patientController.js";
import { upload } from "../services/imageService.js";
import { patientCaseValidator } from "../utils/validation/patientValidator.js";
import { checkAuth } from "../middleware/checkAuth.js";

const router = express.Router();

/**
 * @swagger
 * /patients/add:
 *   post:
 *     summary: Add a new patient case
 *     tags: [Patient]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: number
 *               gender:
 *                 type: string
 *               phone:
 *                 type: string
 *               title:
 *                 type: string
 *               category:
 *                 type: string
 *               location:
 *                 type: string
 *               description:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Patient case created successfully
 *       500:
 *         description: Server error
 */
router.post("/add", checkAuth, upload.array("images"), patientCaseValidator, createPatient);

/**
 * @swagger
 * /patients:
 *   get:
 *     summary: Fetch all patient cases
 *     tags: [Patient]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of patient cases
 *       500:
 *         description: Server error
 */
router.get("/", checkAuth, fetchAllPatients);

/**
 * @swagger
 * /patients/toggle:
 *   post:
 *     summary: Toggle favorite status of a patient
 *     tags: [Patient]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Favorite status toggled successfully
 *       400:
 *         description: Patient ID is required
 *       500:
 *         description: Server error
 */
router.post("/toggle", checkAuth, toggleFavouritePatient);

/**
 * @swagger
 * /patients/search:
 *   get:
 *     summary: Search for patient cases
 *     tags: [Patient]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query
 *     responses:
 *       200:
 *         description: Search results
 *       500:
 *         description: Server error
 */
router.get("/search", checkAuth, searchPatients);

/**
 * @swagger
 * /patients/{id}:
 *   get:
 *     summary: Fetch a patient case by ID
 *     tags: [Patient]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Patient ID
 *     responses:
 *       200:
 *         description: Patient case details
 *       404:
 *         description: Patient not found
 *       500:
 *         description: Server error
 */
router.get("/:id", checkAuth, fetchPatientById);

export default router;