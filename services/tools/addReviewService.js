import Tool from "../../models/toolSchema.js";

export const addReviewService = async (toolId, review) => {
    try {
        const result = await Tool.updateOne(
            { _id: toolId },
            { $push: { reviews: review } }
        );

        if (result.nModified === 0) {
            throw new Error("Tool not found or review not added");
        }

        return await Tool.findById(toolId);
    } catch (error) {
        throw new Error(error.message);
    }
};