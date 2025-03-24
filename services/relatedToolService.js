import Tool from "../models/toolSchema.js";
import mongoose from "mongoose";

export const getRelatedTools = async (identifier) => {
    const isId = mongoose.Types.ObjectId.isValid(identifier);
    
    let category;
    if (isId) {
        const tool = await Tool.findById(identifier);
        if (!tool) throw new Error("Tool not found");
        category = tool.category;
    } else {
        category = identifier;
    }

    return await Tool.find({
        category: category,
        ...(isId && { _id: { $ne: identifier } }) 
    })
    .select('toolName price images category')
    .limit(5);
    };