import Tool from "../../models/toolSchema.js";

export const fetchAllToolsService = async (user) => {
    try {
        const allTools = await Tool.find().populate("createdBy", "name email -role");

        const toolsWithFavoriteStatus = allTools.map(tool => ({
            ...tool._doc,
            isFavTool: user.favoriteTools.some(fav => fav.toString() === tool._id.toString()),
        }));

        return toolsWithFavoriteStatus;
    } catch (error) {
        throw new Error(error.message);
    }
}