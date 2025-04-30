import Tool from "../../models/toolSchema.js";
import { uploadImage } from "../imageService.js";

export const updateToolService = async (studentId, toolId, updateData, files) => {
    try {
        const tool = await Tool.findOne({ _id: toolId, createdBy: studentId });
        if (!tool) throw new Error("Tool not found or not authorized");

        Object.assign(tool, updateData);
        if (files?.length) {
            tool.images = await uploadImage(files);
        }

        await tool.save();
        return tool;
    } catch (error) {
        throw new Error(error.message);
    }
};