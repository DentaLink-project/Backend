import Tool from "../models/toolSchema.js";

export const getToolById = async (toolId) => {
    try {
        const tool = await Tool.findById(toolId); 
        if (!tool) {
            throw new Error("Tool not found");
        }
        return tool;
    } catch (err) {
        console.error('Error in getToolById:', err);
        throw new Error('Failed to fetch tool'+ err.massage);
    }
};