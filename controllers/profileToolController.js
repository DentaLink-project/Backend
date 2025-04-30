import {getToolsByUser} from "../services/profileToolServices/getToolsByUser.js";
import {getFavoriteTools} from "../services/profileToolServices/getFavoriteTools.js";
import {deleteToolById} from "../services/profileToolServices/deleteToolById.js";
import {updateToolService} from "../services/profileToolServices/updateToolDetails.js";



export const fetchToolsByUser = async (req, res) => {
    try {
        const tools = await getToolsByUser(req.student);
        res.status(200).json(tools);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const fetchFavoriteTools = async (req, res) => {
    try {
        const tools = await getFavoriteTools(req.student._id);
        res.status(200).json(tools);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteTool = async (req, res) => {
    try {
        const result = await deleteToolById(req.student._id, req.params.toolId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTool = async (req, res) => {
    try {
        const updatedTool = await updateToolService(
            req.student._id,
            req.params.id,
            req.body,
            req.files
        );
        res.status(200).json(updatedTool);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};