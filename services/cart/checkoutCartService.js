import Cart from "../../models/cartSchema.js";
import Order from "../../models/orderSchema.js";
import { stripePaymentService } from "./stripePaymentService.js";

export const checkoutCartService = async (studentId, paymentDetails) => {
    try {
        const cart = await Cart.findOne({ student: studentId }).populate({
            path: "items.tool",
            select: "toolName price"
        });

        if (!cart || cart.items.length === 0) throw new Error("Cart is empty");

        const paymentResult = await stripePaymentService(studentId, paymentDetails);
        if (!paymentResult || !paymentResult.clientSecret) {
            throw new Error("Failed to create payment intent");
        }

        const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        const order = new Order({
            student: studentId,
            items: cart.items,
            totalPrice: cart.totalPrice,
            orderNumber: orderNumber
        });
        await order.save();

        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        return {
            orderId: order._id,
            orderNumber: order.orderNumber,
            clientSecret: paymentResult.clientSecret,
            amount: paymentResult.amount,
            currency: paymentResult.currency
        };
    } catch (error) {
        throw new Error(error.message);
    }
};