import Tool from "../../models/toolSchema.js";

export const fetchRelatedToolsService = async (user, toolId) => {
    try {
        const tool = await Tool.findById(toolId)
        if (!tool) {
            throw new error("Tool not found");
        }
        const relatedTools = await Tool.find({
            category: tool.category,
            _id: { $ne: toolId },
        }).populate("createdBy", "name email -role");

        const relatedToolsWithFavoriteStatus = relatedTools.map(tool => ({
            ...tool._doc,
            isFavTool: user.favoriteTools.some(fav => fav.toString() === tool._id.toString()),
        }));

        return relatedToolsWithFavoriteStatus;
    }
    catch (error) {
        throw new Error(error.message)
    }
}
