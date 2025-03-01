import Tool from "../models/toolSchema.js";

export const deleteTool = async (toolId) => {
    try {
        const tool = await Tool.findByIdAndDelete(toolId); 
        if (!tool) {
            throw new Error("Tool not found");
        }
        return tool;
    } catch (err) {
        console.error('Error in deleteTool:', err);
        throw new Error('Failed to delete tool');
    }
};