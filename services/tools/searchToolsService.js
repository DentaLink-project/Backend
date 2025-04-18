import Tool from "../../models/toolSchema.js";

export const searchToolsService = async (query, user) => {
    try {
        const searchResults = await Tool.find({ $text: { $search: query } }).populate("createdBy", "name email -role");

        if (!searchResults.length) {
            throw new Error("No results found for your search");
        }

        const searchResultsWithFavorite = searchResults.map(tool => ({
            ...tool._doc,
            isFavTool: user.favoriteTools.some(fav => fav.toString() === tool._id.toString()),
        }));

        return searchResultsWithFavorite;
    } catch (error) {
        throw new Error(error.message);
    }
};