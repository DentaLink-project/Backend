import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    tool: { type: mongoose.Schema.Types.ObjectId, ref: "Tool", required: true },
    quantity: { type: Number, required: true, min: 1 },
});

const cartSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    items: [cartItemSchema],
    totalPrice: { type: Number, required: true, default: 0 },
});


const Cart = mongoose.model("Cart", cartSchema);

export default Cart;