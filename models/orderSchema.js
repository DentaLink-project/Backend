import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    items: [{
        tool: { type: mongoose.Schema.Types.ObjectId, ref: "Tool", required: true },
        quantity: { type: Number, required: true },
        itemTotalPrice: { type: Number, required: true }
    }],
    totalPrice: { type: Number, required: true }, 
    orderNumber: { type: Number, required: true, unique: true },
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;
