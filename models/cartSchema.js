import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    tool: { type: mongoose.Schema.Types.ObjectId, ref: "Tool", required: true },
    quantity: { type: Number, required: true, min: 1 },
});

const cartSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true, unique: true },
    items: [cartItemSchema],
}, { timestamps: true });

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
