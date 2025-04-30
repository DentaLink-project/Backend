import Cart from "../../models/cartSchema.js";

export const incrementCartItemService = async (studentId, toolId) => {
        const cart = await Cart.findOne({ student: studentId });
        if (!cart) throw new Error("Cart not found");
    
        const item = cart.items.find(i => i.tool.toString() === toolId);
        if (!item) throw new Error("Item not in cart");
    
        item.quantity += 1;
        await cart.save();
        return cart;
};