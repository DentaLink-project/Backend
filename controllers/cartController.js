import { addToCart } from "../services/cart/addToCartService.js";
import { removeFromCart } from "../services/cart/removeitemService.js";
import { getCartDetailsService } from "../services/cart/getCartDetailsService.js";
import { checkoutCartService } from "../services/cart/checkoutCartService.js";

export const addItemToCart = async (req, res) => {
    const tools = req.body.tools;
    const studentId = req.student._id; 

    try {
        const cart = await addToCart(studentId, tools);
        res.status(200).json({
            message: "Item added to cart successfully",
            cart,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeItemFromCart = async (req, res) => {
    const { toolId } = req.body;
    const studentId = req.student._id;

    try {
        const cart = await removeFromCart(studentId, toolId);
        res.status(200).json({
            message: "Item removed from cart successfully",
            cart,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCartDetails = async (req, res) => {
    const studentId = req.student._id;

    try {
        const cart = await getCartDetailsService(studentId);
        res.status(200).json(cart);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const checkoutCart = async (req, res) => {
    const studentId = req.student._id;
    const paymentDetails = req.body;

    try {
        const { orderId, clientSecret, amount, currency } = await checkoutCartService(studentId, paymentDetails);

        res.status(200).json({
            message: "Checkout initiated successfully",
            orderId,
            clientSecret,
            amount,
            currency
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}