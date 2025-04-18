import Tool from "../../models/toolSchema.js";
import { uploadImage } from "../imageService.js";

export const createToolService = async ({ toolName, price, description, category, images, reviews, createdBy }) => {
    try {
        if (!images || images.length === 0) {
            throw new Error("At least one image is required");
        }

        const uploadedImageUrls = await uploadImage(images);

        const tool = await Tool.create({ toolName, price, description, category, images: uploadedImageUrls, reviews, createdBy });
        
        return tool;
    }
    catch (error) {
        throw new Error(`Error adding tool: ${error.message}`);
    }
}