import Cart from "../../models/cartSchema.js";


export const removeCartItemService = async (studentId, toolId) => {
    const cart = await Cart.findOne({ student: studentId });
    if (!cart) throw new Error("Cart not found");

    const itemIndex = cart.items.findIndex(item => item.tool.toString() === toolId);
    if (itemIndex === -1) throw new Error("Item not found in cart");

    cart.items.splice(itemIndex, 1); 
    await cart.save();
    return { message: "Item removed from cart successfully" };
};
