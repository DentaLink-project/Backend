import Cart from "../../models/cartSchema.js";

export const getCartDetailsService = async (studentId) => {
    try {
        const cart = await Cart.findOne({ student: studentId }).populate({
            path: "items.tool",
            select: "toolName price description images"
        });

        if (!cart) throw new Error("Cart not found");

        const validItems = cart.items.filter(item => item.tool !== null);
        
        if (validItems.length !== cart.items.length) {
            cart.items = validItems;
            
            cart.totalPrice = cart.items.reduce((total, item) => {
                return total + (item.quantity * (item.tool ? item.tool.price : 0));
            }, 0);
            
            await cart.save();
        }

        return cart;
    } catch (error) {
        throw new Error(error.message);
    }
};