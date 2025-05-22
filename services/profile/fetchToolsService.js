import Tool from "../../models/toolSchema.js";

export const fetchToolsService = async (user) => {
    try {
        const tools = await Tool.find({ createdBy: user._id })
            .populate("createdBy", "name email");
        const toolsWithFavStatus = tools.map(tool => ({
            ...tool._doc,
            isFavTool: user.favoriteTools.some(fav => fav.toString() === tool._id.toString()),
        }));
        return toolsWithFavStatus;
    } catch (error) {
        throw new Error(error.message);
    }
};