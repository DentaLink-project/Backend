import express from "express";
import {
    addToolController ,
    getAllToolsController,
    getToolByIdController,
    getToolsByStudentIdController,
    getToolFavoriteController,
    searchToolsController ,
    deleteToolController,
    getRelatedToolsController,
    addReviewController, 
    getReviewsController,
    addToolInFavoriteController,
    getLatestToolsController} from './../controllers/toolController.js';
import { upload } from "../services/imageService.js";
import { checkAuth } from "../middleware/checkAuth.js";


const router = express.Router();

router.post("/tools",checkAuth, upload.array('images'), addToolController);
router.get("/tools", checkAuth ,getAllToolsController);
router.get("/tools/:toolId", checkAuth,getToolByIdController);
router.get("/student/tools", checkAuth,getToolsByStudentIdController);
router.get("/favorites", checkAuth, getToolFavoriteController);
router.post("/tools/:toolId/favorite", checkAuth, addToolInFavoriteController);
router.get("/search", checkAuth, searchToolsController);
router.delete("/tools/:toolId", checkAuth,deleteToolController);
router.get("/tools/:toolId/related", checkAuth, getRelatedToolsController);
router.post("/tools/:toolId/reviews", checkAuth, addReviewController);
router.get("/tools/:toolId/reviews", checkAuth, getReviewsController);
router.get("/latest", checkAuth, getLatestToolsController);

export default router;
