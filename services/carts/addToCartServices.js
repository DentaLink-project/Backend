import Cart from "../../models/cartSchema.js";

// export const addToCartService = async (studentId, toolId, quantity) => {

//     let cart = await Cart.findOne({ student: studentId });

//     if (!cart) {
//         cart = new Cart({ student: studentId, items: [] });
//     }
//     const existingItem = cart.items.find(item => item.tool.toString() === toolId);

//     if (existingItem) {
//         existingItem.quantity += quantity;
//     } else {
//         cart.items.push({ tool: toolId, quantity });
//     }

//     await cart.save();
//     return cart;
// };

export const addToCartService = async (studentId, toolId) => {
        let cart = await Cart.findOne({ student: studentId });
    
        if (!cart) {
        cart = new Cart({ student: studentId, items: [] });
        }
    
        const existingItem = cart.items.find(item => item.tool.toString() === toolId);
    
        if (existingItem) {
        existingItem.quantity += 1;
        } else {
        cart.items.push({ tool: toolId, quantity: 1 });
        }
    
        await cart.save();
        return cart;
};