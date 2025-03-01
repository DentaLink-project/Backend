import { addToolService} from './../services/toolService.js';
import { getAllTools } from './../services/getAllToolsService.js';
import {getToolById} from './../services/getSingleToolService.js';
import { getToolsByStudentId } from "./../services/getAllToolsService.js";
import {searchTools} from './../services/searchToolsService.js';
import { deleteTool } from './../services/deleteToolService.js';
import { addReview, getReviews } from './../services/reviewService.js';
import {addToolInFavorite} from './../services/addToolFavoriteServices.js';
import {getToolFavorite} from './../services/getAllToolFavorite.js';
import {getLatestTools} from './../services/getLatestToolsServices.js';
import Tool from "./../models/toolSchema.js";


export const addToolController = async (req, res) => {
    try {
        const { toolName, price, description, category } = req.body;
        const images = req.files ;
        const newTool = await addToolService({
            toolName,
            price,
            description,
            category,
            images, 
            createdBy: req.student.id
        });

        res.status(201).json({ message: "Tool added successfully", newTool });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllToolsController = async (req, res) => {
    try {
        const tools = await getAllTools(); 
        res.status(200).json({ tools });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getToolByIdController = async (req, res) => {
    try {
        const { toolId } = req.params; 
        const tool = await getToolById(toolId); 
        res.status(200).json({ tool });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const getToolsByStudentIdController = async (req, res) => {
    try {
        const studentId = req.user._id; 
        const tools = await getToolsByStudentId(studentId);
        res.status(200).json({ tools });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const addToolInFavoriteController = async (req, res) => {
    try {
        const studentId = req.student._id; 
        const { toolId } = req.params; 

        const favorites = await addToolInFavorite(studentId, toolId);

        res.status(200).json({ message: "Tool added to favorites successfully", favorites });
    } catch (err) {
        console.error("Error in addToolInFavoriteController:", err);
        res.status(500).json({ message: err.message || "Server error" });
    }
};

export const getToolFavoriteController = async (req, res) => {
    try {
        const studentId = req.student._id; 

        const favorites = await getToolFavorite(studentId);

        res.status(200).json({ favorites });
    } catch (err) {
        console.error("Error in getToolFavoriteController:", err);
        res.status(500).json({ message: err.message || "Server error" });
    }
};

export const searchToolsController = async (req, res) => {
    try {
        const { title } = req.query; 
        if (!title) {
            return res.status(400).json({ message: "Title is required for search" });
        }

        const tools = await searchTools(title); 
        res.status(200).json(tools); 
    } catch (error) {
        res.status(404).json({ message: error.message }); 
    }
};



export const deleteToolController = async (req, res) => {
    try {
        const { toolId } = req.params; 
        const deletedTool = await deleteTool(toolId); 
        res.status(200).json({ message: "Tool deleted successfully", deletedTool });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const getRelatedToolsController = async (req, res) => {
    try {
        const { toolId } = req.params; 
        const tool = await Tool.findById(toolId); 

        if (!tool) {
            return res.status(404).json({ message: "Tool not found" });
        }

        const relatedTools = await Tool.find({
            category: tool.category, 
            _id: { $ne: toolId } 
        }).limit(5); 

        res.status(200).json({ relatedTools });
    } catch (err) {
        console.error('Error in getRelatedToolsController:', err);
        res.status(500).json({ message: "Server error" });
    }
};


export const addReviewController = async (req, res) => {
    try {
        const { toolId } = req.params; 
        const { description, rating } = req.body; 
        const userId = req.student._id; 

        
        const tool = await addReview(toolId, userId, description, rating);

        res.status(201).json({ message: "Review added successfully", tool });
    } catch (err) {
        console.error('Error in addReviewController:', err);
        res.status(500).json({ message: "Server error" });
    }
};

export const getReviewsController = async (req, res) => {
    try {
        const { toolId } = req.params; 

        const reviews = await getReviews(toolId);

        res.status(200).json({ reviews });
    } catch (err) {
        console.error('Error in getReviewsController:', err);
        res.status(500).json({ message: "Server error" });
    }
};


export const getLatestToolsController = async (req, res) => {
    try {
        const latestTools = await getLatestTools(); 
        res.status(200).json({ tools: latestTools });
    } catch (err) {
        console.error("Error in getLatestToolsController:", err);
        res.status(500).json({ message: "Server error" });
    }
};



