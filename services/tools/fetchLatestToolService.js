import Tool from "../../models/toolSchema.js";

export const fetchLatestToolsService = async (user) => {
    try {
        const latestTools = await Tool.find()
            .sort({ createdAt: -1 })
            .limit(10)
            .populate("createdBy", "name email -role");

        const toolsWithFavoriteStatus = latestTools.map(tool => ({
            ...tool._doc,
            isFavTool: user.favoriteTools.some(fav => fav.toString() === tool._id.toString()),
        }));

        return toolsWithFavoriteStatus;
    } catch (error) {
        throw new Error(error.message);
    }
};