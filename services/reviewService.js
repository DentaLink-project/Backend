import Tool from '../models/toolSchema.js';

export const addReview = async (toolId, userId, description, rating) => {
    const tool = await Tool.findById(toolId);
    if (!tool) {
        throw new Error("Tool not found");
    }
    const review = { user: userId, description, rating };
    const updatedTool = await Tool.findByIdAndUpdate(
        toolId,
        { $push: { reviews: review } }, 
        { new: true, runValidators: false } 
    );

    return updatedTool;
};


