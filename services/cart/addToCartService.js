import Cart from "../../models/cartSchema.js";
import Tool from "../../models/toolSchema.js";

export const addToCart = async (studentId, tools) => {
    try {
        if (!tools || !Array.isArray(tools) || tools.length === 0) {
            throw new Error("Tools array is required and cannot be empty");
        }

        let cart = await Cart.findOne({ student: studentId });

        if (!cart) {
            cart = new Cart({ student: studentId, items: [], totalPrice: 0 });
        }

        for (const { toolId, quantity } of tools) {
            if (!toolId) {
                throw new Error("Tool ID is required for each item");
            }

            const tool = await Tool.findById(toolId);
            if (!tool) {
                throw new Error(`Tool with ID ${toolId} not found`);
            }

            const existingItem = cart.items.find(item => item.tool.toString() === toolId);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.items.push({ tool: toolId, quantity });
            }
        }

        await cart.populate("items.tool");

        // Calculate total price with null checks
        cart.totalPrice = cart.items.reduce((total, item) => {
            // Check if tool exists and has a price
            if (item.tool && typeof item.tool.price === 'number') {
                return total + (item.quantity * item.tool.price);
            } else {
                // If tool is null or doesn't have a price, skip it and log a warning
                console.warn(`Tool not found or has no price for item: ${item.tool}`);
                return total;
            }
        }, 0);

        await cart.save();
        return cart;
    } catch (error) {
        throw new Error(error.message);
    }
};