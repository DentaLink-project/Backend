import Cart from "../../models/cartSchema.js";
import Order from "../../models/orderSchema.js";
import { stripePaymentService } from "./stripePaymentService.js";

export const checkoutCartService = async (studentId, paymentDetails) => {
    try {
        const cart = await Cart.findOne({ student: studentId }).populate({
            path: "items.tool",
            select: "toolName price"
        });

        if (!cart) {
            throw new Error("Cart not found");
        }

        if (cart.items.length === 0) {
            throw new Error("Cart is empty");
        }

        // Filter out items with null tools before checkout
        const validItems = cart.items.filter(item => item.tool !== null);
        
        if (validItems.length === 0) {
            throw new Error("No valid items found in cart");
        }

        if (validItems.length !== cart.items.length) {
            console.warn(`Removed ${cart.items.length - validItems.length} items with null tools before checkout`);
            cart.items = validItems;
            
            // Recalculate total price
            cart.totalPrice = cart.items.reduce((total, item) => {
                if (item.tool && typeof item.tool.price === 'number') {
                    return total + (item.quantity * item.tool.price);
                } else {
                    console.warn(`Tool has no price for item: ${item.tool}`);
                    return total;
                }
            }, 0);
        }

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

        // Clear the cart after successful order creation
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