import Tool from "../models/toolSchema.js";

export const searchTools = async (title) => {
    try {
        const searchResults = await Tool.find({
            toolName: { $regex: title, $options: 'i' },
            
        });

        if (!searchResults.length) {
            throw new Error("No tool found with this toolName");
        }

        return searchResults;
    } catch (error) {
        throw new Error(error.message);
    }
};