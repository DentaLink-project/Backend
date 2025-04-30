import Cart from "../../models/cartSchema.js";

export const decrementCartItemService = async (studentId, toolId) => {
        const cart = await Cart.findOne({ student: studentId });
        if (!cart) throw new Error("Cart not found");
    
        const item = cart.items.find(i => i.tool.toString() === toolId);
        if (!item) throw new Error("Item not in cart");
    
        if (item.quantity > 1) {
        item.quantity -= 1;
        } else {
        cart.items = cart.items.filter(i => i.tool.toString() !== toolId);
        }
    
        await cart.save();
        return cart;
};