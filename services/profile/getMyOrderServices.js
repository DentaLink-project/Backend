import Order from "../../models/orderSchema.js";

export const getMyOrdersService = async (studentId) => {
    const orders = await Order.find({ student: studentId })
        .sort({ createdAt: -1 })
        .populate("items.tool", "toolName price images");

    const formattedOrders = orders.map((order, index) => ({
        id: order._id,
        orderNumber: order.orderNumber || index + 1,
        totalPrice: order.totalPrice,
        createdAt: order.createdAt,
        items: order.items
        .filter(item => item.tool) 
        .map(item => ({
            toolName: item.tool.toolName,
            price: item.tool.price,
            image: item.tool.images,
            quantity: item.quantity,
            itemTotalPrice: item.itemTotalPrice,
        })),
    }));

    return formattedOrders;
};



