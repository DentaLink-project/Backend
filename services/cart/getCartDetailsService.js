import Cart from "../../models/cartSchema.js";

export const getCartDetailsService = async (studentId) => {
    try {
        const cart = await Cart.findOne({ student: studentId }).populate({
            path: "items.tool",
            select: "toolName price description images"
        });

        if (!cart) {
            throw new Error("Cart not found");
        }

        // Filter out items with null tools and recalculate total price
        const validItems = cart.items.filter(item => item.tool !== null);
        
        if (validItems.length !== cart.items.length) {
            console.warn(`Removed ${cart.items.length - validItems.length} items with null tools from cart`);
            cart.items = validItems;
            
            // Recalculate total price with null checks
            cart.totalPrice = cart.items.reduce((total, item) => {
                if (item.tool && typeof item.tool.price === 'number') {
                    return total + (item.quantity * item.tool.price);
                } else {
                    console.warn(`Tool has no price for item: ${item.tool}`);
                    return total;
                }
            }, 0);
            
            await cart.save();
        } else {
            // Even if all items are valid, still check for price calculation
            cart.totalPrice = cart.items.reduce((total, item) => {
                if (item.tool && typeof item.tool.price === 'number') {
                    return total + (item.quantity * item.tool.price);
                } else {
                    console.warn(`Tool has no price for item: ${item.tool}`);
                    return total;
                }
            }, 0);
        }

        return cart;
    } catch (error) {
        throw new Error(error.message);
    }
};