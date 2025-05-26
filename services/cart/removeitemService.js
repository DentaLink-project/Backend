import Cart from "../../models/cartSchema.js";

export const removeFromCart = async (studentId, toolId) => {
    try {
        const cart = await Cart.findOne({ student: studentId });
        if (!cart) throw new Error("Cart not found");

        const item = cart.items.find(item => item.tool.toString() === toolId);
        if (!item) throw new Error("Item not found in cart");

        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            cart.items = cart.items.filter(item => item.tool.toString() !== toolId);
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