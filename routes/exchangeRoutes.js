import express from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import * as EC from "../controllers/exchangeToolController.js";
import { upload } from "../services/imageService.js";
import { exchangeValidator } from "../utils/validation/exchangeToolValidation.js";


const router = express.Router();

router.post("/add", checkAuth, upload.array("images"),exchangeValidator, EC.addExchange); 
router.get("/" ,checkAuth, EC.fetchAllExchanges)
router.get("/search",checkAuth, EC.fetchExchangesByToothName)
router.post("/toggle", checkAuth, EC.toggleFavoriteExchangeController);
router.put("/update/:id", checkAuth, upload.array("images"),exchangeValidator, EC.updateExchangeController);







export default router