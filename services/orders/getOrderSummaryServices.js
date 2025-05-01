import Cart from "../../models/cartSchema.js";

export const getOrderSummaryService = async (studentId) => {
    const cart = await Cart.findOne({ student: studentId }).populate("items.tool");

    if (!cart || cart.items.length === 0) {
        throw new Error("Cart is empty");
    }

    const items = cart.items.map(item => ({
        tool: item.tool,
        quantity: item.quantity,
        itemTotalPrice: item.tool.price * item.quantity
    }));

    const productTotal = items.reduce((acc, item) => acc + item.itemTotalPrice, 0);
    const deliveryFee = 50;
    const discount = 0;
    const total = productTotal + deliveryFee - discount;

    return {
        items,
        productTotal,
        deliveryFee,
        discount,
        total
    };
};
