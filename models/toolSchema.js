import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    description: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 }, 
}, { timestamps: true });

const toolSchema= new mongoose.Schema({
    toolName: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'student', required: true },
    images: { type: [String], required: true },
    reviews: { type: [reviewSchema], default: [] },
    isFavourite: { type: Boolean, default: false }
}, { timestamps: true });

toolSchema.index({title:"text"});



const Tool = mongoose.model("Tool", toolSchema);

export default Tool;