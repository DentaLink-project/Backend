import Student from "../models/studentSchema.js";
import { addReviewService } from "../services/tools/addReviewService.js";
import { createToolService } from "../services/tools/createToolService.js";
import { fetchAllToolsService } from "../services/tools/fetchAllToolsService.js";
import { fetchLatestToolsService } from "../services/tools/fetchLatestToolService.js";
import { fetchRelatedToolsService } from "../services/tools/fetchRelatedToolsService.js";
import { fetchToolByIdService } from "../services/tools/fetchToolByIdservice.js";
import { searchToolsService } from "../services/tools/searchToolsService.js";
import { toggleFavouriteToolService } from "../services/tools/toggleFavoriteToolService.js";

export const createTool = async (req, res) => {
    try {
        const { toolName, price, description, category, reviews } = req.body;
        const image = req.file;

        if (!image) {
            return res.status(400).json({ message: "Image is required" });
        }

        const tool = await createToolService({
            toolName,
            price,
            description,
            category,
            reviews,
            image,
            createdBy: req.student.id
        });
        res.status(201).json({ message: "Tool added successfully", tool });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const searchTools = async (req, res) => {
    try {
        const userId = req.student._id; 
        const user = await Student.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ message: "Query is required for search" });
        }

        const tools = await searchToolsService(query, user);
        res.status(200).json(tools);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const fetchToolById = async (req, res) => {
    try {
        const { id } = req.params;
        const studentId = req.student._id; 

        const tool = await fetchToolByIdService(id, studentId)
        
        res.status(200).json(tool);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const fetchAllTools = async (req, res) => {
    try {
        const userId = req.student._id; 
        const user = await Student.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const tools = await fetchAllToolsService(user); 
        res.status(200).json(tools);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const toggleFavouriteTool = async (req, res) => {
    try {
        const studentId = req.student._id; 
        const { toolId } = req.body;

        if (!toolId) {
            return res.status(400).json({ message: "Tool ID is required" });
        }
            const result = await toggleFavouriteToolService(studentId, toolId);
            res.status(200).json({ success: true, message: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const fetchRelatedTools = async (req, res) => {
    const { toolId } = req.params;

    try {
        const userId = req.student._id; 
        const user = await Student.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const relatedTools = await fetchRelatedToolsService(user, toolId);
        res.status(200).json(relatedTools);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const addReview = async(req, res) =>{
    const { toolId } = req.params;
    const { comment, rating } = req.body;

    try {
        const userId = req.student._id;

        const review = {
            user: userId,
            comment,
            rating,
        };

        const updatedTool = await addReviewService(toolId, review);
        res.status(200).json(updatedTool);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const fetchLatestTools = async (req, res) => {
    try {
        const userId = req.student._id; 
        const user = await Student.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const tools = await fetchLatestToolsService(user); 
        res.status(200).json(tools);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}