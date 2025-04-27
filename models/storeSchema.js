import mongoose, { Schema } from "mongoose";

const storeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    contactInfo: { type: String, required: true },
    about: { type: String, required: true },
    tools: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tool" }]
}, { timestamps: true });

const Store = mongoose.model("Store", storeSchema);

export default Store;