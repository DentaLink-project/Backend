import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    comment: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 }, 
}, { timestamps: true });

const toolSchema= new mongoose.Schema({
    toolName: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: [String], required: true },
    reviews: { type: [reviewSchema], default: [] },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
}, { timestamps: true });

toolSchema.index({
    toolName: "text",
    description: "text",
    category: "text",
});


const Tool = mongoose.model("Tool", toolSchema);
export default Tool;