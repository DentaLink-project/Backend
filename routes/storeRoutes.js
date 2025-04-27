import express from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import { checkAdmin } from "../middleware/checkAdmin.js";
import {
    createStoreController,
    updateStoreController,
    getStoreByIdController,
    deleteStoreController,
} from "../controllers/storeController.js";

const router = express.Router();

/**
 * @swagger
 * /store/create:
 *   post:
 *     summary: Create a new store
 *     tags: [Store]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               contactInfo:
 *                 type: string
 *               about:
 *                 type: string
 *               tools:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Store created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied
 */
router.post("/create", checkAuth, checkAdmin, createStoreController);

/**
 * @swagger
 * /store/update/{id}:
 *   put:
 *     summary: Update a store
 *     tags: [Store]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the store to update
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
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               contactInfo:
 *                 type: string
 *               about:
 *                 type: string
 *               tools:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Store updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied
 *       404:
 *         description: Store not found
 */
router.put("/update/:id", checkAuth, checkAdmin, updateStoreController);

/**
 * @swagger
 * /store/{id}:
 *   get:
 *     summary: Fetch a store by ID
 *     tags: [Store]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the store to fetch
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Store details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Store not found
 */
router.get("/:id", checkAuth, getStoreByIdController);

/**
 * @swagger
 * /store/delete/{id}:
 *   delete:
 *     summary: Delete a store
 *     tags: [Store]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the store to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Store deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied
 *       404:
 *         description: Store not found
 */
router.delete("/delete/:id", checkAuth, checkAdmin, deleteStoreController);

export default router;