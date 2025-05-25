import express from 'express';
import { checkAuth } from '../middleware/checkAuth.js';
import {
    fetchTools,
    fetchFavorites,
    deleteTool,
    updateTool,
    fetchPatient,
    updatePatient,
    deletePatient,
    fetchExchanges,
    deleteExchange,
    fetchOrders,
} from '../controllers/profileController.js';
import { upload } from '../services/imageService.js';

const router = express.Router();

/**
 * @swagger
 * /profile/my-tools:
 *   get:
 *     summary: Get user's tools
 *     description: Retrieve all tools created by the current user
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tools retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   toolName:
 *                     type: string
 *                   price:
 *                     type: number
 *                   description:
 *                     type: string
 *                   category:
 *                     type: string
 *                   images:
 *                     type: array
 *                     items:
 *                       type: string
 *                   isFavTool:
 *                     type: boolean
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.get('/my-tools', checkAuth, fetchTools);

/**
 * @swagger
 * /profile/favorites:
 *   get:
 *     summary: Get user's favorites
 *     description: Retrieve all favorite tools, patients, and exchanges of the current user
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Favorites retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 favoriteTools:
 *                   type: array
 *                   items:
 *                     type: object
 *                 favoritePatients:
 *                   type: array
 *                   items:
 *                     type: object
 *                 favoriteExchanges:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.get('/favorites', checkAuth, fetchFavorites);

/**
 * @swagger
 * /profile/exchanges/my-exchanges:
 *   get:
 *     summary: Get user's exchanges
 *     description: Retrieve all exchanges created by the current user
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Exchanges retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   toothName:
 *                     type: string
 *                   exchangeWith:
 *                     type: string
 *                   notes:
 *                     type: string
 *                   contact:
 *                     type: string
 *                   images:
 *                     type: array
 *                     items:
 *                       type: string
 *                   isFavExchange:
 *                     type: boolean
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.get("/exchanges/my-exchanges", checkAuth, fetchExchanges);

/**
 * @swagger
 * /profile/patients/my-patients:
 *   get:
 *     summary: Get user's patients
 *     description: Retrieve all patients created by the current user
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Patients retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: User not found
 */
router.get("/patients/my-patients", checkAuth, fetchPatient);

/**
 * @swagger
 * /profile/orders/my-orders:
 *   get:
 *     summary: Get user's orders
 *     description: Retrieve all orders made by the current user
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       items:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             tool:
 *                               type: object
 *                               properties:
 *                                 toolName:
 *                                   type: string
 *                                 price:
 *                                   type: number
 *                                 images:
 *                                   type: array
 *                                   items:
 *                                     type: string
 *                             quantity:
 *                               type: number
 *                       totalPrice:
 *                         type: number
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.get('/orders/my-orders', checkAuth, fetchOrders);

/**
 * @swagger
 * /profile/{id}:
 *   put:
 *     summary: Update a tool
 *     description: Update an existing tool created by the current user
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Tool ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               toolName:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Tool updated successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Tool not found or not authorized
 */
router.put('/:id', checkAuth, upload.array("images"), updateTool);

/**
 * @swagger
 * /profile/patients/{id}:
 *   put:
 *     summary: Update a patient
 *     description: Update an existing patient created by the current user
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Patient ID
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
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Patient updated successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Patient not found or not authorized
 */
router.put("/patients/:id", checkAuth, upload.array("images"), updatePatient);

/**
 * @swagger
 * /profile/{toolId}:
 *   delete:
 *     summary: Delete a tool
 *     description: Delete a tool created by the current user
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: toolId
 *         required: true
 *         schema:
 *           type: string
 *         description: Tool ID
 *     responses:
 *       200:
 *         description: Tool deleted successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Tool not found or not authorized
 */
router.delete('/:toolId', checkAuth, deleteTool);

/**
 * @swagger
 * /profile/patients/{patientId}:
 *   delete:
 *     summary: Delete a patient
 *     description: Delete a patient created by the current user
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: Patient ID
 *     responses:
 *       200:
 *         description: Patient deleted successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Patient not found or not authorized
 */
router.delete("/patients/:patientId", checkAuth, deletePatient);

/**
 * @swagger
 * /profile/exchanges/{id}:
 *   delete:
 *     summary: Delete an exchange
 *     description: Delete an exchange created by the current user
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Exchange ID
 *     responses:
 *       200:
 *         description: Exchange deleted successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Exchange not found or not authorized
 */
router.delete("/exchanges/:id", checkAuth, deleteExchange);

export default router;
