import Cart from "../../models/cartSchema.js";

export const getCartService = async (studentId) => {
    const cart = await Cart.findOne({ student: studentId }).populate("items.tool");
    if (!cart || cart.items.length === 0) throw new Error("Cart is empty");

    const itemsWithTotalPrice = cart.items.map(item => ({
        _id: item._id,
        tool: item.tool,
        quantity: item.quantity,
        itemTotalPrice: item.quantity * item.tool.price
    }));

    return {
        _id: cart._id,
        student: cart.student,
        totalItems: cart.items.length,
        items: itemsWithTotalPrice
    };
};
