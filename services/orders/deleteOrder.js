import Order from "../../models/orderSchema.js";

export const deleteOrderService = async (orderId, studentId) => {
  const order = await Order.findOne({ _id: orderId, student: studentId });

  if (!order) {
    throw new Error("Order not found or unauthorized");
  }

  await order.deleteOne();

  return { message: "Order deleted successfully" };
};
