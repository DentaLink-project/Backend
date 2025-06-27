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
 *     description: Create a new dental tool with image, name, description, price, and category
 *     tags: [Tools]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - category
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Tool image (optional)
 *               name:
 *                 type: string
 *                 description: Name of the tool
 *                 example: "Dental Scaler"
 *               description:
 *                 type: string
 *                 description: Detailed description of the tool
 *                 example: "Professional dental scaler for removing plaque and tartar"
 *               price:
 *                 type: number
 *                 description: Price of the tool
 *                 example: 29.99
 *               category:
 *                 type: string
 *                 description: Category of the tool
 *                 example: "Cleaning Tools"
 *     responses:
 *       201:
 *         description: Tool created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Tool created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "507f1f77bcf86cd799439011"
 *                     name:
 *                       type: string
 *                       example: "Dental Scaler"
 *                     description:
 *                       type: string
 *                       example: "Professional dental scaler for removing plaque and tartar"
 *                     price:
 *                       type: number
 *                       example: 29.99
 *                     category:
 *                       type: string
 *                       example: "Cleaning Tools"
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["https://example.com/image1.jpg"]
 *                     createdBy:
 *                       type: string
 *                       example: "507f1f77bcf86cd799439012"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Validation failed"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Access denied. No token provided."
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.post("/add", checkAuth, upload.single('image'), toolValidator, createTool);

/**
 * @swagger
 * /tools/search:
 *   get:
 *     summary: Search tools
 *     description: Search for tools by name, description, or category
 *     tags: [Tools]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: query
 *         in: query
 *         description: Search query for tool name, description, or category
 *         required: false
 *         schema:
 *           type: string
 *           example: "dental scaler"
 *     responses:
 *       200:
 *         description: List of tools matching the search query
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "507f1f77bcf86cd799439011"
 *                       name:
 *                         type: string
 *                         example: "Dental Scaler"
 *                       description:
 *                         type: string
 *                         example: "Professional dental scaler for removing plaque and tartar"
 *                       price:
 *                         type: number
 *                         example: 29.99
 *                       category:
 *                         type: string
 *                         example: "Cleaning Tools"
 *                       images:
 *                         type: array
 *                         items:
 *                           type: string
 *                       isFavTool:
 *                         type: boolean
 *                         example: false
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Access denied. No token provided."
 *       500:
 *         description: Server error
 */
router.get("/search", checkAuth, searchTools);

/**
 * @swagger
 * /tools:
 *   get:
 *     summary: Fetch all tools
 *     description: Retrieve all available tools with pagination support
 *     tags: [Tools]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number for pagination
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *           example: 1
 *       - name: limit
 *         in: query
 *         description: Number of tools per page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *           example: 10
 *     responses:
 *       200:
 *         description: List of all tools
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "507f1f77bcf86cd799439011"
 *                       name:
 *                         type: string
 *                         example: "Dental Scaler"
 *                       description:
 *                         type: string
 *                         example: "Professional dental scaler for removing plaque and tartar"
 *                       price:
 *                         type: number
 *                         example: 29.99
 *                       category:
 *                         type: string
 *                         example: "Cleaning Tools"
 *                       images:
 *                         type: array
 *                         items:
 *                           type: string
 *                       isFavTool:
 *                         type: boolean
 *                         example: false
 *                       reviews:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             rating:
 *                               type: number
 *                               example: 4.5
 *                             comment:
 *                               type: string
 *                               example: "Great quality tool"
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                     totalPages:
 *                       type: integer
 *                       example: 5
 *                     totalTools:
 *                       type: integer
 *                       example: 50
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Access denied. No token provided."
 *       500:
 *         description: Server error
 */
router.get("/", checkAuth, fetchAllTools);

/**
 * @swagger
 * /tools/toggle:
 *   post:
 *     summary: Toggle favorite status
 *     description: Add or remove a tool from user's favorites
 *     tags: [Tools]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - toolId
 *             properties:
 *               toolId:
 *                 type: string
 *                 description: ID of the tool to toggle favorite status
 *                 example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Favorite status toggled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Tool added to favorites"
 *                 isFavTool:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request - Tool ID is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Tool ID is required"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Access denied. No token provided."
 *       404:
 *         description: Tool not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Tool not found"
 *       500:
 *         description: Server error
 */
router.post("/toggle", checkAuth, toggleFavouriteTool);

/**
 * @swagger
 * /tools/{toolId}/related:
 *   get:
 *     summary: Fetch related tools
 *     description: Get tools that are related to the specified tool (same category or similar)
 *     tags: [Tools]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: toolId
 *         in: path
 *         description: ID of the tool to find related tools for
 *         required: true
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *       - name: limit
 *         in: query
 *         description: Maximum number of related tools to return
 *         required: false
 *         schema:
 *           type: integer
 *           default: 5
 *           example: 5
 *     responses:
 *       200:
 *         description: List of related tools
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "507f1f77bcf86cd799439012"
 *                       name:
 *                         type: string
 *                         example: "Dental Mirror"
 *                       description:
 *                         type: string
 *                         example: "Professional dental mirror for examination"
 *                       price:
 *                         type: number
 *                         example: 15.99
 *                       category:
 *                         type: string
 *                         example: "Examination Tools"
 *                       images:
 *                         type: array
 *                         items:
 *                           type: string
 *                       isFavTool:
 *                         type: boolean
 *                         example: false
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Access denied. No token provided."
 *       404:
 *         description: Tool not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Tool not found"
 *       500:
 *         description: Server error
 */
router.get('/:toolId/related', checkAuth, fetchRelatedTools);

/**
 * @swagger
 * /tools/{toolId}/review:
 *   post:
 *     summary: Add a review
 *     description: Add a rating and comment review for a specific tool
 *     tags: [Tools]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: toolId
 *         in: path
 *         description: ID of the tool to add review for
 *         required: true
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *             properties:
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 description: Rating from 1 to 5 stars
 *                 example: 5
 *               comment:
 *                 type: string
 *                 description: Optional comment for the review
 *                 example: "Excellent quality tool, highly recommended!"
 *     responses:
 *       201:
 *         description: Review added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Review added successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "507f1f77bcf86cd799439013"
 *                     rating:
 *                       type: integer
 *                       example: 5
 *                     comment:
 *                       type: string
 *                       example: "Excellent quality tool, highly recommended!"
 *                     user:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Rating must be between 1 and 5"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Access denied. No token provided."
 *       404:
 *         description: Tool not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Tool not found"
 *       500:
 *         description: Server error
 */
router.post('/:toolId/review', checkAuth, addReview);

/**
 * @swagger
 * /tools/latest:
 *   get:
 *     summary: Fetch latest tools
 *     description: Get the most recently added tools
 *     tags: [Tools]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: limit
 *         in: query
 *         description: Number of latest tools to return
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *           example: 10
 *     responses:
 *       200:
 *         description: List of latest tools
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "507f1f77bcf86cd799439011"
 *                       name:
 *                         type: string
 *                         example: "Dental Scaler"
 *                       description:
 *                         type: string
 *                         example: "Professional dental scaler for removing plaque and tartar"
 *                       price:
 *                         type: number
 *                         example: 29.99
 *                       category:
 *                         type: string
 *                         example: "Cleaning Tools"
 *                       images:
 *                         type: array
 *                         items:
 *                           type: string
 *                       isFavTool:
 *                         type: boolean
 *                         example: false
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Access denied. No token provided."
 *       500:
 *         description: Server error
 */
router.get("/latest", checkAuth, fetchLatestTools);

/**
 * @swagger
 * /tools/{id}:
 *   get:
 *     summary: Fetch tool by ID
 *     description: Get detailed information about a specific tool including reviews
 *     tags: [Tools]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the tool to fetch
 *         required: true
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Tool details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "507f1f77bcf86cd799439011"
 *                     name:
 *                       type: string
 *                       example: "Dental Scaler"
 *                     description:
 *                       type: string
 *                       example: "Professional dental scaler for removing plaque and tartar"
 *                     price:
 *                       type: number
 *                       example: 29.99
 *                     category:
 *                       type: string
 *                       example: "Cleaning Tools"
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
 *                     isFavTool:
 *                       type: boolean
 *                       example: false
 *                     createdBy:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         email:
 *                           type: string
 *                     reviews:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           rating:
 *                             type: integer
 *                             example: 5
 *                           comment:
 *                             type: string
 *                             example: "Excellent quality tool"
 *                           user:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                     averageRating:
 *                       type: number
 *                       example: 4.5
 *                     totalReviews:
 *                       type: integer
 *                       example: 12
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Access denied. No token provided."
 *       404:
 *         description: Tool not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Tool not found"
 *       500:
 *         description: Server error
 */
router.get("/:id", checkAuth, fetchToolById);

export default router;