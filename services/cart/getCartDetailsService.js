import Cart from "../../models/cartSchema.js";

export const getCartDetailsService = async (studentId) => {
    try {
        const cart = await Cart.findOne({ student: studentId }).populate({
            path: "items.tool",
            select: "toolName price images"
        });

        if (!cart) throw new Error("Cart not found");

        return cart;
    } catch (error) {
        throw new Error(error.message);
    }
};