import express from "express";
import { upload } from "../services/imageService.js";
import { checkAuth } from "../middleware/checkAuth.js";
import { toolValidator } from "../utils/validation/toolValidation.js";
import { addReview, createTool, fetchAllTools, fetchLatestTools, fetchRelatedTools, fetchToolById, searchTools, toggleFavouriteTool } from "../controllers/toolController.js";


const router = express.Router();

router.post("/add",checkAuth, upload.array('images'), toolValidator, createTool);
router.get("/search", checkAuth, searchTools);
router.get("/", checkAuth, fetchAllTools);
router.post("/toggle", checkAuth, toggleFavouriteTool );
router.get('/:toolId/related', checkAuth, fetchRelatedTools);
router.post('/:toolId/review', checkAuth, addReview);
router.get("/latest", checkAuth, fetchLatestTools);
router.get("/:id", checkAuth, fetchToolById);

export default router;