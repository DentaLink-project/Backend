import Order from "../../models/orderSchema.js";

export const fetchOrderService = async (studentId) => {
    try {
        const orders = await Order.find({ student: studentId })
            .populate({
                path: 'items.tool',
                select: 'toolName price images'
            })
            .sort({ createdAt: -1 });

        return {
            success: true,
            data: orders
        };
    } catch (error) {
        throw new Error("Failed to fetch orders: " + error.message);
    }
};
