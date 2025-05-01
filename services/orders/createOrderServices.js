import Cart from "../../models/cartSchema.js";
import Order from "../../models/orderSchema.js";

export const createOrderService = async (studentId) => {
    const cart = await Cart.findOne({ student: studentId }).populate("items.tool");

    if (!cart || cart.items.length === 0) {
        throw new Error("Cart is empty");
    }

    const orderItems = cart.items.map(item => ({
        tool: item.tool._id,
        quantity: item.quantity,
        itemTotalPrice: item.tool.price * item.quantity,
    }));

    const productTotal = orderItems.reduce((acc, item) => acc + item.itemTotalPrice, 0);
    const deliveryFee = 50;
    const discount = 0;
    const totalPrice = productTotal + deliveryFee - discount;

    const lastOrder = await Order.findOne().sort({ orderNumber: -1 });
    const newOrderNumber = lastOrder ? lastOrder.orderNumber + 1 : 1;

    const order = new Order({
        student: studentId,
        orderNumber: newOrderNumber,
        items: orderItems,
        totalPrice,
    });

    await order.save();
    await cart.deleteOne();

    return order;
};



// import Cart from "../../models/cartSchema.js";
// import Order from "../../models/orderSchema.js";

// export const createOrderService = async (studentId) => {
//     const cart = await Cart.findOne({ student: studentId }).populate("items.tool");

//     if (!cart || cart.items.length === 0) {
//         throw new Error("Cart is empty");
//     }

//     const orderItems = cart.items.map(item => ({
//         tool: item.tool._id,
//         quantity: item.quantity,
//         itemTotalPrice: item.tool.price * item.quantity,
//     }));

//     const productTotal = orderItems.reduce((acc, item) => acc + item.itemTotalPrice, 0);

//     const deliveryFee = 50; 
//     const discount = 0; 
//     const totalPrice = productTotal + deliveryFee - discount;

//     const order = new Order({
//         student: studentId,
//         items: orderItems,
//         totalPrice,
//     });

//     await order.save();
//     await cart.deleteOne(); 

//     return order;
// };
