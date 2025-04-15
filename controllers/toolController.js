import { addToolService} from './services/toolService.js';
import { getAllTools } from './services/getAllToolsService.js';
import {searchTools} from './../services/searchToolsService.js';
import { addReview } from './../services/reviewService.js';
import {getRelatedTools} from './../services/relatedToolService.js'
import {favoriteToolServices} from './../services/ToolFavorit.js';
import {getLatestTools} from './../services/getLatestToolsServices.js';



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





export const searchToolsController = async (req, res) => {
    try {
        const { title } = req.query;
        if (!title || title.trim() === "") {
            return res.status(400).json({ message: "Search term is required" });
        }

        const tools = await searchTools(title);
        if (tools.length === 0) {
            return res.status(404).json({ message: "No tools found matching your search" });
        }

        res.status(200).json(tools);
    } catch (error) {
        res.status(500).json({ message: "Server error: " + error.message });
    }
};



export const getRelatedToolsController = async (req, res) => {
    try {
    const { category, toolId } = req.query;

    if (!category && !toolId) {
        return res.status(400).json({ message: "Either category or toolId must be provided" });
    }

    const identifier = toolId || category;
    const relatedTools = await getRelatedTools(identifier);
    
    res.status(200).json({ relatedTools });
    } catch (err) {
    const status = err.message === "Tool not found" ? 404 : 500;
    res.status(status).json({ message: err.message });
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


export const getLatestToolsController = async (req, res) => {
    try {
        const latestTools = await getLatestTools(); 
        res.status(200).json({ tools: latestTools });
    } catch (err) {
        console.error("Error in getLatestToolsController:", err);
        res.status(500).json({ message: "Server error" });
    }
};


export const favoriteToolController = async (req, res) => {
    try {
        const studentId = req.student._id; 
        const { toolId } = req.body;

        if (!toolId) {
            return res.status(400).json({ message: "Tool ID is required" });
        }
            const result = await favoriteToolServices(studentId, toolId);
            res.status(200).json({ success: true, message: result });
    } catch (error) {
        console.error("Error in favoriteToolController:", error);
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
}

