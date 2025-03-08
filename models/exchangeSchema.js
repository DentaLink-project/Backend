import mongoose from "mongoose";

const exchangeSchema = new mongoose.Schema({
    publisher: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Student", 
        required: true
    },
    name: { type: String},
    toothName: { type: String, required: true },
    exchangeWith: { type: String, required: true },
    notes: { type: String },
    contact: { type: String, required: true },
    images: {type: [String], required: true }, 
    createdAt: { type: Date, default: Date.now }
});

exchangeSchema.index({ toothName: "text" });


const Exchange = mongoose.model("Exchange", exchangeSchema);
export default Exchange;