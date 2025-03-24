import express from "express";
import {
    addToolController ,
    getAllToolsController,
    favoriteToolController,
    searchToolsController ,
    getRelatedToolsController,
    addReviewController, 
    getLatestToolsController} from './../controllers/toolController.js';
import { upload } from "../services/imageService.js";
import { checkAuth } from "../middleware/checkAuth.js";


const router = express.Router();

router.post("/add",checkAuth, upload.array('images'), addToolController);
router.get("/get", checkAuth ,getAllToolsController);
router.get("/favorites", checkAuth, favoriteToolController);
router.get("/search", checkAuth, searchToolsController);
router.get('/related', checkAuth, getRelatedToolsController);
router.post('/:toolId/reviews', checkAuth, addReviewController);
router.get("/latest", checkAuth, getLatestToolsController);

export default router;
