import express from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import { upload } from "../services/imageService.js";
import { exchangeValidator } from "../utils/validation/exchangeToolValidation.js";
import { addExchange, fetchAllExchanges, searchExchanges, toggleFavoriteExchangeController, updateExchangeController } from "../controllers/exchangeTeethController.js";


const router = express.Router();

router.post("/add", checkAuth, upload.array("images"),exchangeValidator, addExchange); 
router.get("/" ,checkAuth, fetchAllExchanges)
router.get("/search",checkAuth, searchExchanges)
router.post("/toggle", checkAuth, toggleFavoriteExchangeController);
router.put("/update/:id", checkAuth, upload.array("images"), updateExchangeController);







export default router