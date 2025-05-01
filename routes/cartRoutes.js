import express from "express";
import { addToCart, incrementCartItem, decrementCartItem, getCart, getSuggestedTools, removeCartItemController } from "../controllers/cartController.js";
import { checkAuth } from "../middleware/checkAuth.js";

const router = express.Router();


router.post("/add" , checkAuth , addToCart);
router.patch("/increment/:toolId", checkAuth, incrementCartItem);
router.patch("/decrement/:toolId", checkAuth, decrementCartItem);
router.get("/", checkAuth, getCart)
router.delete("/remove/:toolId", checkAuth, removeCartItemController);
router.get("/suggested", checkAuth, getSuggestedTools);


export default router;
