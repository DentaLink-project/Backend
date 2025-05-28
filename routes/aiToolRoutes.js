import express from 'express';
import { checkAuth } from '../middleware/checkAuth.js';
import { upload } from '../services/imageService.js';
import { analyzeImage, fetchChats, fetchChatMessages, deleteChatController } from '../controllers/aiToolController.js';

const router = express.Router();

/**
 * @swagger
 * /ai-tool/analyze:
 *   post:
 *     summary: Send a message to the dental AI assistant
 *     description: Send a text message and/or dental image for analysis
 *     tags: [AI Tools]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Optional dental image for analysis
 *               message:
 *                 type: string
 *                 description: Text message or question for the AI assistant
 *               chatId:
 *                 type: string
 *                 description: Optional chat ID for continuing an existing conversation
 *     responses:
 *       200:
 *         description: Message processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     chatId:
 *                       type: string
 *                     geminiResponse:
 *                       type: string
 *                     imageUrl:
 *                       type: string
 *                       description: Present only if an image was provided
 *       400:
 *         description: Either a message or an image must be provided
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/analyze', checkAuth, upload.single('image'), analyzeImage);

/**
 * @swagger
 * /ai-tool/chats:
 *   get:
 *     summary: Get all chats for the current user
 *     description: Retrieve a list of all chat conversations
 *     tags: [AI Tools]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of chats retrieved successfully
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
 *                       title:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/chats', checkAuth, fetchChats);

/**
 * @swagger
 * /ai-tool/chats/{chatId}:
 *   get:
 *     summary: Get messages from a specific chat
 *     description: Retrieve all messages from a specific chat conversation
 *     tags: [AI Tools]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the chat to retrieve
 *     responses:
 *       200:
 *         description: Chat messages retrieved successfully
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
 *                       role:
 *                         type: string
 *                         enum: [user, assistant]
 *                       content:
 *                         type: string
 *                       image:
 *                         type: string
 *                         description: Present only if message contains an image
 *                       analysis:
 *                         type: object
 *                         description: Present only if message contains image analysis
 *                       timestamp:
 *                         type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Chat not found
 *       500:
 *         description: Server error
 */
router.get('/chats/:chatId', checkAuth, fetchChatMessages);

/**
 * @swagger
 * /ai-tool/chats/{chatId}:
 *   delete:
 *     summary: Delete a specific chat
 *     description: Permanently delete a chat conversation and all its messages
 *     tags: [AI Tools]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the chat to delete
 *     responses:
 *       200:
 *         description: Chat deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Chat not found
 *       500:
 *         description: Server error
 */
router.delete('/chats/:chatId', checkAuth, deleteChatController);

export default router; 