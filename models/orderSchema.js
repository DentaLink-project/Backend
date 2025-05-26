import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    tool: { type: mongoose.Schema.Types.ObjectId, ref: "Tool", required: true },
    quantity: { type: Number, required: true, min: 1 },
});

const orderSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    items: [orderItemSchema],
    totalPrice: { type: Number, required: true },
    orderNumber: { type: String, required: true, unique: true }
});

const Order = mongoose.model("Order", orderSchema);

export default Order;