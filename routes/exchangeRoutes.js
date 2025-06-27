import express from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import { upload } from "../services/imageService.js";
import { exchangeValidator } from "../utils/validation/exchangeToolValidation.js";
import { addExchange, fetchAllExchanges, searchExchanges, toggleFavoriteExchangeController, updateExchangeController } from "../controllers/exchangeTeethController.js";

const router = express.Router();

/**
 * @swagger
 * /exchanges/add:
 *   post:
 *     summary: Add a new exchange
 *     tags: [Exchange]
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
 *               toothName:
 *                 type: string
 *               exchangeWith:
 *                 type: string
 *               notes:
 *                 type: string
 *               contact:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Exchange created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/add", checkAuth, upload.array("images"), exchangeValidator, addExchange);

/**
 * @swagger
 * /exchanges:
 *   get:
 *     summary: Fetch all exchanges
 *     tags: [Exchange]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all exchanges
 *       401:
 *         description: Unauthorized
 */
router.get("/", checkAuth, fetchAllExchanges);

/**
 * @swagger
 * /exchanges/search:
 *   get:
 *     summary: Search exchanges
 *     tags: [Exchange]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: query
 *         in: query
 *         description: Search query for tooth name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of exchanges matching the search query
 *       400:
 *         description: Tooth name is required for search
 *       401:
 *         description: Unauthorized
 */
router.get("/search", checkAuth, searchExchanges);

/**
 * @swagger
 * /exchanges/toggle:
 *   post:
 *     summary: Toggle favorite status of an exchange
 *     tags: [Exchange]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               exchangeId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Favorite status toggled successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/toggle", checkAuth, toggleFavoriteExchangeController);

/**
 * @swagger
 * /exchanges/update/{id}:
 *   put:
 *     summary: Update an exchange
 *     tags: [Exchange]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the exchange to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               toothName:
 *                 type: string
 *               exchangeWith:
 *                 type: string
 *               notes:
 *                 type: string
 *               contact:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Exchange updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Exchange not found
 */
router.put("/update/:id", checkAuth, upload.array("images"), updateExchangeController);

export default router;