/*import Tool from "../models/toolSchema.js";

export const relatedTools = async (toolId) => {
    try {
        const currentTool = await Tool.findById(toolId);
        if (!currentTool) {
            throw new Error("Tool not found");
        }

        const rTools= await Tool.find({
            category: currentTool.category, 
            _id: { $ne: toolId } 
        });

        if (!rTools.length) {
            throw new Error("No related tools found");
        }

        return rTools;
    } catch (error) {
        console.error('Error in relatedTools:', error);
        throw new Error('Failed to fetch related tools');
    }
};

export default relatedTools ;*/