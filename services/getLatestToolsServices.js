import Tool from "../models/toolSchema.js";

export const getLatestTools = async () => {
    return await Tool.find().sort({ createdAt: -1 }).limit(10); 
};