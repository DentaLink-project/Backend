import express from 'express';
import { checkAuth } from '../middleware/checkAuth.js';
import {
    fetchToolsByUser,
    fetchFavoriteTools,
    deleteTool,
    updateTool
} from '../controllers/profileToolController.js';

const router = express.Router();

router.get('/my-tools', checkAuth, fetchToolsByUser);
router.get('/favorites', checkAuth, fetchFavoriteTools);
router.delete('/:toolId', checkAuth, deleteTool);
router.put('/:id', checkAuth, updateTool);

export default router;