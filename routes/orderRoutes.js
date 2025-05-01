import express from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import { createOrderController, deleteOrderController, getOrderSummary } from "../controllers/orderController.js";

const router = express.Router();

router.post("/create",checkAuth, createOrderController);
router.get("/order-summary", checkAuth, getOrderSummary);
router.delete("/:orderId", checkAuth, deleteOrderController);


export default router;