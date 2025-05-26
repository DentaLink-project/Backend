import express from "express";
import {
    addItemToCart,
    removeItemFromCart,
    getCartDetails,
    checkoutCart,
} from "../controllers/cartController.js";
import { checkAuth } from "../middleware/checkAuth.js";

const router = express.Router();

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get cart details
 *     description: Retrieve the current user's cart with all items and total price
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       tool:
 *                         type: object
 *                         properties:
 *                           toolName:
 *                             type: string
 *                           description:
 *                             type: string
 *                           price:
 *                             type: number
 *                           images:
 *                             type: array
 *                             items:
 *                               type: string
 *                       quantity:
 *                         type: number
 *                 totalPrice:
 *                   type: number
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Cart not found
 */
router.get("/", checkAuth, getCartDetails);

/**
 * @swagger
 * /cart/add:
 *   post:
 *     summary: Add item to cart
 *     description: Add one or more tools to the user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tools:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     toolId:
 *                       type: string
 *                     quantity:
 *                       type: number
 *     responses:
 *       200:
 *         description: Item added to cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 cart:
 *                   type: object
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Tool not found
 */
router.post("/add", checkAuth, addItemToCart);

/**
 * @swagger
 * /cart/remove:
 *   delete:
 *     summary: Remove item from cart
 *     description: Remove a tool from the user's cart
 *     tags: [Cart]
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
 *         description: Item removed from cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 cart:
 *                   type: object
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Cart or tool not found
 */
router.delete("/remove", checkAuth, removeItemFromCart);

/**
 * @swagger
 * /cart/checkout:
 *   post:
 *     summary: Checkout cart
 *     description: Process the cart checkout and create an order
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Checkout initiated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 orderId:
 *                   type: string
 *                 clientSecret:
 *                   type: string
 *                 amount:
 *                   type: number
 *                 currency:
 *                   type: string
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       400:
 *         description: Cart is empty
 *       500:
 *         description: Payment processing failed
 */
router.post("/checkout", checkAuth, checkoutCart);

export default router;