import Tool from "../../models/toolSchema.js";
import { uploadImage } from "../imageService.js";

export const updateToolService = async (studentId, toolId, updateData, files) => {
    try {
        const tool = await Tool.findOne({ _id: toolId, createdBy: studentId });
        if (!tool) throw new Error("Tool not found or not authorized");

        Object.assign(tool, updateData);
        if (files && files.length > 0) {
            const imageUrls = await uploadImage(files);
            tool.images = imageUrls;  
        }

        await tool.save();
        return tool;
    } catch (error) {
        throw new Error(error.message);
    }
};