import Cart from "../../models/cartSchema.js";
import Order from "../../models/orderSchema.js";
import Stripe from "stripe";
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripePaymentService = async (studentId, paymentDetails) => {
    try {
        const cart = await Cart.findOne({ student: studentId }).populate({
            path: "items.tool",
            select: "toolName price"
        });

        if (!cart || cart.items.length === 0) throw new Error("Cart is empty");

        // Stripe expects amount in the smallest currency unit (e.g., cents)
        const amountInCents = Math.round(cart.totalPrice * 100);

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountInCents,
            currency: "egp",
            receipt_email: paymentDetails.email,
            metadata: {
                studentId: studentId.toString(),
                cartId: cart._id.toString(),
            },
        });

        return {
            clientSecret: paymentIntent.client_secret,
            amount: cart.totalPrice,
            currency: "EGP"
        };
    } catch (error) {
        throw new Error(error.message);
    }
}; 