import Tool from "../../models/toolSchema.js";

export const getAllTools = async () => {
    try {
        const tools = await Tool.find(); 
        return tools;
    } catch (err) {
        console.error('Error in getAllTools:', err);
        throw new Error('Failed to fetch tools');
    }
};


