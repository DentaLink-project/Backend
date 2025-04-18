import express from "express";
import { upload } from "../services/imageService.js";
import { checkAuth } from "../middleware/checkAuth.js";
import { toolValidator } from "../utils/validation/toolValidation.js";
import { addReview, createTool, fetchAllTools, fetchLatestTools, fetchRelatedTools, fetchToolById, searchTools, toggleFavouriteTool } from "../controllers/toolController.js";

const router = express.Router();

/**
 * @swagger
 * /tools/add:
 *   post:
 *     summary: Add a new tool
 *     tags: [Tools]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tool created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/add", checkAuth, upload.array('images'), toolValidator, createTool);

/**
 * @swagger
 * /tools/search:
 *   get:
 *     summary: Search tools
 *     tags: [Tools]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: query
 *         in: query
 *         description: Search query
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of tools matching the search query
 *       401:
 *         description: Unauthorized
 */
router.get("/search", checkAuth, searchTools);

/**
 * @swagger
 * /tools:
 *   get:
 *     summary: Fetch all tools
 *     tags: [Tools]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all tools
 *       401:
 *         description: Unauthorized
 */
router.get("/", checkAuth, fetchAllTools);

/**
 * @swagger
 * /tools/toggle:
 *   post:
 *     summary: Toggle favorite status
 *     tags: [Tools]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               toolId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Favorite status toggled successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/toggle", checkAuth, toggleFavouriteTool);

/**
 * @swagger
 * /tools/{toolId}/related:
 *   get:
 *     summary: Fetch related tools
 *     tags: [Tools]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: toolId
 *         in: path
 *         description: ID of the tool
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of related tools
 *       401:
 *         description: Unauthorized
 */
router.get('/:toolId/related', checkAuth, fetchRelatedTools);

/**
 * @swagger
 * /tools/{toolId}/review:
 *   post:
 *     summary: Add a review
 *     tags: [Tools]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: toolId
 *         in: path
 *         description: ID of the tool
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review added successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/:toolId/review', checkAuth, addReview);

/**
 * @swagger
 * /tools/latest:
 *   get:
 *     summary: Fetch latest tools
 *     tags: [Tools]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of latest tools
 *       401:
 *         description: Unauthorized
 */
router.get("/latest", checkAuth, fetchLatestTools);

/**
 * @swagger
 * /tools/{id}:
 *   get:
 *     summary: Fetch tool by ID
 *     tags: [Tools]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the tool
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tool details
 *       401:
 *         description: Unauthorized
 */
router.get("/:id", checkAuth, fetchToolById);

export default router;