import Cart from "../../models/cartSchema.js";
import Tool from "../../models/toolSchema.js";

export const addToCart = async (studentId, tools) => {
    try {
        if (!tools) throw new Error("Tool not found");

        let cart = await Cart.findOne({ student: studentId });

        if (!cart) {
            cart = new Cart({ student: studentId, items: [], totalPrice: 0 });
        }

        for (const { toolId, quantity } of tools) {
            const tool = await Tool.findById(toolId);
            if (!tool) throw new Error(`Tool with ID ${toolId} not found`);

            const existingItem = cart.items.find(item => item.tool.toString() === toolId);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.items.push({ tool: toolId, quantity });
            }
        }

        await cart.populate("items.tool");

        cart.totalPrice = cart.items.reduce((total, item) => {
            return total + item.quantity * item.tool.price;
        }, 0);

        await cart.save();
        return cart;
    } catch (error) {
        throw new Error(error.message);
    }
};