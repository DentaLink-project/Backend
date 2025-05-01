import Cart from "../../models/cartSchema.js";
import Tool from "../../models/toolSchema.js";

export const getSuggestedToolsService = async (studentId) => {
    const cart = await Cart.findOne({ student: studentId }).populate("items.tool");

    const categoriesInCart = cart?.items.map(item => item.tool.category) || [];

    const suggestedTools = await Tool.find({
        category: { $in: categoriesInCart }
    }).limit(5); 

    return suggestedTools;
};
